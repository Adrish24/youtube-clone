# YouTube Clone - Server

## Overview

This is the server-side of a full-stack YouTube clone project, built with Node.js and Express. It provides RESTful APIs for video management, user authentication, channel operations, comments, and search functionality. The backend uses MongoDB for data storage and JWT for secure authentication.

---

## Features

- **User Authentication:** Signup, login, JWT-based authentication, and authorization middleware.
- **Channel Management:** Create, update, and manage user channels.
- **Video Management:** Upload, fetch, and manage videos.
- **Comment System:** Add, edit, delete, and fetch comments for videos.
- **Search:** Search videos by keywords.
- **Logging & Validation:** Middleware for request logging and input validation.

---

## Folder Structure

```
server/
├── config/         # Database connection
├── controllers/    # Route handlers for auth, channel, video, comment, search
├── middleware/     # Authorization, logger, validator
├── models/         # Mongoose models for User, Channel, Video, Comment
├── routes/         # API route definitions
├── utils/          # Utility functions
├── index.js        # Entry point
├── package.json    # Dependencies and scripts
└── .env            # Environment variables
```

---

## Setup

1. **Install Dependencies**

   ```sh
   npm install
   ```

2. **Environment Variables**

   Create a `.env` file in the root of `server/` and set the following:

   ```
   MONGODB_URI=mongodb://localhost:27017/youtube-clone
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Run the Server**

   ```sh
   npm start
   ```

   The server will run at [http://localhost:5000](http://localhost:5000).

---

## Usage

- **API Endpoints:**
  - `/api/auth` for authentication (login, signup)
  - `/api/channel` for channel operations
  - `/api/video` for video management
  - `/api/comment` for comment operations
  - `/api/search` for searching videos/channels

---

## Key Technologies

- **Node.js** (Express framework)
- **MongoDB** (Mongoose ODM)
- **JWT** (Authentication)
- **Middleware** (for logging, validation, authorization)

---

## Code Structure & Comments

- All controllers, models, and middleware are well-commented for clarity.
- Modular structure for scalability and maintainability.
- Utility functions for common operations (e.g., user, video, comment helpers).
