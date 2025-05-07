# Statistics Calculator API

A Node.js/Express backend API that performs various statistical calculations on arrays of numbers. This project is part of the Affordmed Full Stack Campus Hiring Evaluation.

## 📦 Tech Stack
- Node.js
- Express.js
- Body-parser
- CORS

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the server
```bash
npm start
```

The server will start running on `http://localhost:3000`

## 📡 API Endpoints

### 1. Calculate Average
- **Endpoint:** `POST /calculate-average`
- **Request Body:**
```json
{
  "numbers": [10, 20, 30, 40, 50]
}
```
- **Response:**
```json
{
  "average": 30
}
```

### 2. Calculate Median
- **Endpoint:** `POST /calculate-median`
- **Request Body:**
```json
{
  "numbers": [10, 20, 30, 40, 50]
}
```
- **Response:**
```json
{
  "median": 30
}
```

### 3. Calculate Mode
- **Endpoint:** `POST /calculate-mode`
- **Request Body:**
```json
{
  "numbers": [1, 2, 2, 3, 4, 4, 4, 5]
}
```
- **Response:**
```json
{
  "mode": [4]
}
```

### 4. Calculate Standard Deviation
- **Endpoint:** `POST /calculate-stddev`
- **Request Body:**
```json
{
  "numbers": [2, 4, 4, 4, 5, 5, 7, 9]
}
```
- **Response:**
```json
{
  "standardDeviation": 2
}
```

## ✅ Validations

All endpoints validate that:
- The input is a non-empty array
- All elements in the array are numbers

## 🧪 Testing the API

### Using Postman
1. Import the provided Postman collection from the `screenshots` folder
2. Set the base URL to `http://localhost:3000`
3. Send requests to each endpoint with the sample payloads provided above

### Using curl
```bash
# Example using curl
curl -X POST http://localhost:3000/calculate-average \
  -H "Content-Type: application/json" \
  -d '{"numbers":[1,2,3,4,5]}'
```

## 📝 Error Handling

The API returns appropriate error messages for invalid inputs:

```json
{
  "error": "Please send a non-empty array of numbers"
}
```

or

```json
{
  "error": "All elements must be numbers"
}
```

## 🔒 Security

- CORS is enabled for cross-origin requests
- Input validation is implemented for all endpoints
- No external libraries are used for calculations
- All calculations are performed using native JavaScript

## 📸 Screenshots

The `screenshots` directory contains:
- Postman test results for each endpoint
- Sample request/response pairs
- Error handling examples

## 🎯 Implementation Details

### Key Features
1. Pure JavaScript implementation without external algorithm libraries
2. Input validation and error handling
3. RESTful API design
4. Clean code structure with helper functions
5. Comprehensive documentation

### Technical Decisions
1. Used Express.js for routing and middleware
2. Implemented custom calculation functions without external libraries
3. Added CORS support for cross-origin requests
4. Used body-parser for JSON request handling

## 📋 Assumptions and Limitations

1. Input numbers are expected to be within JavaScript's number range
2. Mode calculation returns an array of all modes if multiple exist
3. Standard deviation is calculated using the population formula
4. All calculations are performed in memory without persistence

## 📬 Contact

For any queries or issues, please reach out to your evaluator. 