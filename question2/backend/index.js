const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Cache for storing data to minimize API calls
let cache = {
  users: null,
  posts: {},
  comments: {},
  lastFetch: null
};

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if cache is valid
const isCacheValid = () => {
  return cache.lastFetch && (Date.now() - cache.lastFetch) < CACHE_DURATION;
};

// Helper function to fetch all users
async function fetchAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Helper function to fetch posts for a user
async function fetchUserPosts(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
}

// Helper function to fetch comments for a post
async function fetchPostComments(postId) {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
}

// GET /users - Returns top 5 users with most posts
app.get('/users', async (req, res) => {
  try {
    if (!isCacheValid()) {
      // Fetch all users
      const users = await fetchAllUsers();
      
      // Fetch posts for each user
      const usersWithPosts = await Promise.all(
        users.map(async (user) => {
          const posts = await fetchUserPosts(user.id);
          return {
            ...user,
            postCount: posts.length,
            posts: posts
          };
        })
      );

      // Sort users by post count and get top 5
      const topUsers = usersWithPosts
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5);

      // Update cache
      cache.users = topUsers;
      cache.lastFetch = Date.now();
    }

    res.json(cache.users);
  } catch (error) {
    console.error('Error in /users endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /posts - Returns posts based on type (popular/latest)
app.get('/posts', async (req, res) => {
  try {
    const { type } = req.query;

    if (!isCacheValid()) {
      const users = await fetchAllUsers();
      let allPosts = [];

      // Fetch all posts
      for (const user of users) {
        const posts = await fetchUserPosts(user.id);
        allPosts = [...allPosts, ...posts];
      }

      // Fetch comments for each post
      const postsWithComments = await Promise.all(
        allPosts.map(async (post) => {
          const comments = await fetchPostComments(post.id);
          return {
            ...post,
            commentCount: comments.length,
            comments: comments
          };
        })
      );

      // Update cache
      cache.posts = postsWithComments;
      cache.lastFetch = Date.now();
    }

    let result;
    if (type === 'popular') {
      // Return posts with most comments
      const maxComments = Math.max(...cache.posts.map(p => p.commentCount));
      result = cache.posts.filter(p => p.commentCount === maxComments);
    } else if (type === 'latest') {
      // Return posts sorted by timestamp (newest first)
      result = [...cache.posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else {
      return res.status(400).json({ error: 'Invalid type parameter' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /posts endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
}); 