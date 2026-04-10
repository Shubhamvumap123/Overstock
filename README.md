# Job Tracker SaaS Platform

A production-ready full-stack application to track and manage job applications effectively. Organize your job search, track interview statuses, and analyze your job hunting progress.

## Features

*   **User Authentication**: Secure sign-up, log-in, and log-out functionality utilizing JWT.
*   **Job Application Management**: Complete CRUD (Create, Read, Update, Delete) operations for job applications.
*   **Status Tracking**: Track the current status of each application (Applied, Interview, Offer, Rejected).
*   **Search and Filter**: Easily search through job listings and filter them by status or company.
*   **Dashboard Analytics**: Visual representations (charts) of your job application statistics.
*   **Role-Based Access**: Infrastructure ready for differentiating between standard users and admins.

## Tech Stack

**Frontend**
*   React.js / Next.js
*   TailwindCSS
*   Recharts (for analytics)
*   Axios

**Backend**
*   Node.js
*   Express.js
*   JSON Web Tokens (JWT) for authentication
*   Bcrypt.js for password hashing

**Database**
*   MongoDB
*   Mongoose ODM

## Screenshots

*(Placeholders for future screenshots)*

| Dashboard Overview | Add New Job |
| :---: | :---: |
| ![Dashboard](https://via.placeholder.com/600x400?text=Dashboard+Analytics+Screenshot) | ![Add Job](https://via.placeholder.com/600x400?text=Add+Job+Modal+Screenshot) |

| Job List View | User Authentication |
| :---: | :---: |
| ![Job List](https://via.placeholder.com/600x400?text=Job+List+and+Filters+Screenshot) | ![Login](https://via.placeholder.com/600x400?text=Login/Signup+Screenshot) |

## Setup Instructions

### Prerequisites

*   Node.js (v18+)
*   MongoDB URI (Local or MongoDB Atlas)

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    ```
    *   Create a `.env` file in the `server` directory.
    *   Add the following variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_jwt_key
        ```
    *   Start the backend server:
        ```bash
        npm run dev
        ```

3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
    ```
    *   Create a `.env.local` file in the `client` directory.
    *   Add the following variable:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:5000/api
        ```
    *   Start the frontend development server:
        ```bash
        npm run dev
        ```

4.  **Access the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Refer to the `IMPLEMENTATION_GUIDE.md` for detailed instructions on deploying the backend to Render and the frontend to Vercel.
