import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing the ThemeProvider context
import { ThemeProvider } from "./context/ThemeProvider.jsx";

// Importing the UI loader & error componeents
import { HomeLoader } from "./components/ui/Loader.jsx";

// Importing data loaders
import { watchVideoLoader } from "./utils";

// Importing pages
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchVideo = lazy(() => import("./pages/WatchVideo.jsx"));
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Channel = lazy(() => import("./pages/Channel.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<HomeLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: "/watch",
        element: (
          <Suspense>
            <WatchVideo />
          </Suspense>
        ),
        loader: watchVideoLoader,
        errorElement: <div className="mt-14">Error loading video</div>,
      },
      {
        path: "/:channelName",
        element: (
          <Suspense>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
