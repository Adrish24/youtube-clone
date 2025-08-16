# YouTube Clone - Client

## Overview

This is the client-side of a full-stack YouTube clone project built with React and Vite. It replicates core features of YouTube, including video browsing, channel management, commenting, authentication, and more. The UI is responsive and modern, leveraging React hooks, context, and Redux for state management.

---

## Features

- **Home Page:** Browse and filter videos by category.
- **Watch Page:** Watch videos, view metadata, suggested videos, and comments.
- **Channel Page:** View channel banner, metadata, and uploaded videos.
- **Authentication:** Login and signup functionality with JWT system.
- **Comment System:** Add, edit, delete, and view comments on videos.
- **Sidebar & Navigation:** Responsive sidebar with navigation and profile management.
- **Search:** Search for videos by title, category, channelname.
- **Upload Video:** Authenticated users can upload videos to their channels.
- **Theme Support:** Toggle theme between dark and ligh mode.

---

## Folder Structure

```
client/
├── public/                # Static assets
│   └── dummySearchHistory.js
├── src/
│   ├── components/        # Reusable UI and feature components
│   ├── constants/         # Static data (categories, emojis, etc.)
│   ├── context/           # Theme and Redux state management
│   ├── hooks/             # Custom React hooks for data fetching and UI
│   ├── pages/             # Main application pages (Home, Watch, Channel, etc.)
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## Setup

1. **Install Dependencies**

   ```sh
   npm install
   ```

2. **Environment Variables**

   Create a `.env` file in the root of `client/` and set the API URL:

   ```
   VITE_API_URL=http://localhost:5000
   ```

3. **Run the Development Server**

   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

- **Browse Videos:** Visit the home page to browse and filter videos.
- **Watch Videos:** Click on any video to open the watch page, view details, and interact with comments.
- **Search:** Use the search bar to find videos.
- **Authentication:** Sign up or log in to access personalized features.
- **Channel Management:** Create and manage your channel, upload, edit or delete your videos.
- **Commenting:** Add, edit, or delete comments on videos.
- **Header:** Access your profile menu via the header.

---

## Key Technologies

- **React** (with hooks and context)
- **Redux Toolkit** (for global state)
- **Vite** (for fast development)
- **Axios** (for API requests)
- **React Router** (for navigation)
- **Tailwind CSS / Custom CSS** (for styling)
- **DaisyUI** (for specialized utility classes for styling)
