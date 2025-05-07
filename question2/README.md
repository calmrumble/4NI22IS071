# Social Media Analytics Frontend

A React-based frontend application for social media analytics, built with Material UI and TypeScript.

## 📦 Tech Stack

### Frontend
- React with TypeScript
- Material UI (MUI)
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- Axios
- CORS

## 🚀 Getting Started

### 1. Start the Backend Server

```bash
cd backend
npm install
npm start
```

The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Application

```bash
cd frontend
npm install
npm start
```

The frontend application will start on `http://localhost:3000`

## 📱 Features

### 1. Top Users Page
- Displays the 5 users with the most posts
- Shows user avatars and post counts
- Real-time data updates

### 2. Trending Posts Page
- Shows posts with the highest number of comments
- Displays all posts that match the highest comment count
- Includes post images, comments, and engagement metrics

### 3. Feed Page
- Shows latest posts in real-time
- Auto-refreshes every 30 seconds
- Manual refresh option
- Responsive grid layout

## 🎨 UI/UX Features

- Responsive design (mobile and desktop)
- Material UI components
- Loading skeletons
- Error handling
- Real-time updates
- Random images for posts and avatars

## 🔄 API Integration

### Backend Endpoints

1. `GET /users`
   - Returns top 5 users with most posts
   - Includes user details and post counts

2. `GET /posts?type=popular`
   - Returns posts with highest comment count
   - Includes full post details and comments

3. `GET /posts?type=latest`
   - Returns latest posts
   - Sorted by timestamp

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🔒 Performance Optimizations

1. Backend
   - Data caching (5-minute cache)
   - Efficient sorting algorithms
   - Error handling

2. Frontend
   - Lazy loading images
   - Skeleton loading states
   - Optimized re-renders
   - Error boundaries

## 📝 Notes

- All calculations are performed on the backend
- No external libraries used for data processing
- Material UI used for consistent design
- Real-time updates implemented with polling

## 🧪 Testing

You can test the application by:
1. Starting both backend and frontend servers
2. Opening `http://localhost:3000` in your browser
3. Testing responsive design using browser dev tools
4. Verifying real-time updates on the Feed page

## 📸 Screenshots

Screenshots of the application can be found in the `screenshots` directory:
- Desktop view
- Mobile view
- Tablet view
- Loading states
- Error states 