# Job Tracker SaaS Platform - Architectural Suggestions & Deployment

This document provides suggestions for improving the scalability and architecture of the application, as well as deployment instructions for Vercel and Render. Note that the codebase has already been successfully migrated to the new Next.js + Express stack!

## Architecture & Scalability Improvements

1.  **State Management**: Consider adopting React Query or SWR in the frontend for robust server-state management. They provide out-of-the-box caching, retries, deduplication, and background updates, replacing the need for complex `useEffect` and `useState` combinations.
2.  **Monorepo Tools**: As the project scales, managing `client/` and `server/` might become complex. Utilizing a monorepo tool like Nx, Turborepo, or Lerna can help manage dependencies, build pipelines, and share code (e.g., TypeScript interfaces for API payloads) between frontend and backend.
3.  **Authentication Security**: Currently, JWTs are stored in `localStorage`, which exposes them to XSS attacks. A more secure approach is to use HttpOnly cookies to store the JWT, making it inaccessible to client-side JavaScript. The backend can set this cookie upon login.
4.  **Database Indexing**: Ensure that frequently queried fields in MongoDB are indexed. For instance, the `user` field in the `Job` model should be indexed to speed up queries fetching jobs for a specific user.
5.  **Pagination and Filtering**: The current implementation fetches all jobs for a user at once. For scalability, implement server-side pagination and filtering. The backend should accept `page`, `limit`, and `status` query parameters to return only the requested subset of data.

## Deployment Steps

### Backend Deployment (Render)

1.  Push your code to a GitHub repository.
2.  Sign up on [Render](https://render.com/).
3.  Click "New" and select "Web Service".
4.  Connect your GitHub repository.
5.  Configure the service:
    *   **Root Directory**: `server`
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
6.  Add Environment Variables in the "Advanced" section:
    *   `PORT`: `5000` (or leave default)
    *   `MONGO_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas)
    *   `JWT_SECRET`: A strong secret key for signing JWTs
7.  Click "Create Web Service". Render will build and deploy your backend. Note the assigned URL.

### Frontend Deployment (Vercel)

1.  Ensure `client/src/services/api.js` dynamically uses an environment variable for the backend URL instead of hardcoding `http://localhost:5000`. You can update it like this:
    ```javascript
    const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api' });
    ```
2.  Sign up on [Vercel](https://vercel.com/).
3.  Click "Add New..." -> "Project".
4.  Import your GitHub repository.
5.  Configure the project:
    *   **Framework Preset**: Next.js
    *   **Root Directory**: `client`
6.  Add Environment Variables:
    *   `NEXT_PUBLIC_API_URL`: The URL of your deployed Render backend (e.g., `https://your-backend-app.onrender.com/api`)
7.  Click "Deploy". Vercel will build and deploy your frontend.

## Step-by-Step Implementation Details

This section provides code snippets of the core features implemented during the migration to the Next.js + Express stack.

### 1. Database Connection (`server/index.js`)

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 2. User Authentication Controller (`server/controllers/authController.js`)

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ... loginUser implementation
```

### 3. JWT Protection Middleware (`server/middleware/auth.js`)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
```

### 4. Job Dashboard UI (`client/src/app/dashboard/page.tsx`)

```tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import JobCard from "../../components/JobCard";
import JobForm from "../../components/JobForm";
// ... Recharts imports

export default function Dashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/jobs");
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [router]);

  // ... handleAddJob, handleEditJob, handleDeleteJob implementations

  return (
    // Dashboard JSX with JobCard components and Recharts BarChart
  );
}
```
