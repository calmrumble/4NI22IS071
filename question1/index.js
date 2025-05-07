const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Helper function to calculate average
function calculateAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Helper function to calculate median
function calculateMedian(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

// Helper function to calculate mode
function calculateMode(numbers) {
  const frequency = {};
  let maxFreq = 0;
  let modes = [];

  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
    }
  });

  for (const num in frequency) {
    if (frequency[num] === maxFreq) {
      modes.push(Number(num));
    }
  }

  return modes;
}

// Helper function to calculate standard deviation
function calculateStandardDeviation(numbers) {
  const avg = calculateAverage(numbers);
  const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
  const avgSquareDiff = calculateAverage(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

// POST API endpoint for average
app.post('/calculate-average', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Please send a non-empty array of numbers' });
  }

  for (let num of numbers) {
    if (typeof num !== 'number') {
      return res.status(400).json({ error: 'All elements must be numbers' });
    }
  }

  const average = calculateAverage(numbers);
  res.json({ average });
});

// POST API endpoint for median
app.post('/calculate-median', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Please send a non-empty array of numbers' });
  }

  for (let num of numbers) {
    if (typeof num !== 'number') {
      return res.status(400).json({ error: 'All elements must be numbers' });
    }
  }

  const median = calculateMedian(numbers);
  res.json({ median });
});

// POST API endpoint for mode
app.post('/calculate-mode', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Please send a non-empty array of numbers' });
  }

  for (let num of numbers) {
    if (typeof num !== 'number') {
      return res.status(400).json({ error: 'All elements must be numbers' });
    }
  }

  const mode = calculateMode(numbers);
  res.json({ mode });
});

// POST API endpoint for standard deviation
app.post('/calculate-stddev', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Please send a non-empty array of numbers' });
  }

  for (let num of numbers) {
    if (typeof num !== 'number') {
      return res.status(400).json({ error: 'All elements must be numbers' });
    }
  }

  const stdDev = calculateStandardDeviation(numbers);
  res.json({ standardDeviation: stdDev });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Statistics Calculator API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 