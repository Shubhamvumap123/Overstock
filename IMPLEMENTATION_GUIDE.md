# Job Tracker - Step-by-Step Implementation Guide

This guide details the implementation steps to build a production-ready full-stack Job Tracker SaaS application.

## Architecture Recommendations

*   **Monorepo vs. Multi-repo**: Using a single repository with `client/` and `server/` folders is great for simple setups. However, as the project scales, considering a monorepo tool like Nx or Turborepo, or splitting them into two repositories can be beneficial.
*   **Next.js App Router**: Utilizing Next.js's App Router allows for robust Server-Side Rendering (SSR) and seamless API integration within the `client/` if you chose to eventually fold the backend into Next.js. For now, a decoupled Node.js/Express backend provides great flexibility.
*   **State Management**: Use React Query or SWR for robust server-state management in the frontend, rather than plain `useEffect` and `useState`, to get caching, retries, and background updates out-of-the-box.
*   **Authentication**: Using JSON Web Tokens (JWT) is excellent. Be sure to use HttpOnly cookies for the JWT in production rather than storing it in `localStorage` to prevent XSS attacks.

---

## Step 1: Backend Setup (Node.js + Express)

Navigate to the `server/` directory and initialize the project.

```bash
cd server
npm init -y
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install --save-dev nodemon
```

### 1.1 Express Entry Point (`server/index.js`)

Create the main server file to handle routing, middleware, and database connection.

```javascript
// server/index.js
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

### 1.2 Models

**User Model (`server/models/User.js`)**

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

**Job Model (`server/models/Job.js`)**

```javascript
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, default: 'Applied', enum: ['Applied', 'Interview', 'Offer', 'Rejected'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
```

### 1.3 JWT Middleware (`server/middleware/auth.js`)

```javascript
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
```

### 1.4 Controllers & Routes

Implement standard CRUD in `server/controllers/jobController.js` and auth in `server/controllers/authController.js`. Hook them up in `server/routes/jobs.js` and `server/routes/auth.js`.

---

## Step 2: Frontend Setup (Next.js + TailwindCSS)

Initialize Next.js in the `client/` directory.

```bash
npx create-next-app@latest client
# Choose yes for Tailwind CSS, ESLint, App Router
cd client
npm install axios react-icons recharts
```

### 2.1 API Service (Axios)

Create a centralized API service `client/src/services/api.js`.

```javascript
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;
```

### 2.2 Dashboard Page (`client/src/app/dashboard/page.js`)

```javascript
'use client'
import { useState, useEffect } from 'react';
import API from '../../services/api';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get('/jobs');
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Job Tracker Dashboard</h1>
      {/* Map through jobs and render job cards here */}
    </div>
  );
}
```

---

## Step 3: Deployment

### 3.1 Backend Deployment (Render)

1. Push your code to a GitHub repository.
2. Sign up on [Render](https://render.com/).
3. Create a new "Web Service".
4. Connect your GitHub repository.
5. Set the "Root Directory" to `server`.
6. Set "Build Command" to `npm install` and "Start Command" to `node index.js`.
7. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, etc.).

### 3.2 Frontend Deployment (Vercel)

1. Sign up on [Vercel](https://vercel.com/).
2. Click "Add New..." -> "Project".
3. Import your GitHub repository.
4. Set the "Framework Preset" to Next.js.
5. Set the "Root Directory" to `client`.
6. Add Environment Variables (e.g., `NEXT_PUBLIC_API_URL` pointing to your Render backend URL).
7. Deploy.
