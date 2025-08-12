import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing the ThemeProvider context
import { ThemeProvider } from "./context/ThemeProvider.jsx";

// Importing the UI loader & error componeents
import { HomeLoader, WatchVideoLoader } from "./components/ui/Loader.jsx";

// Importing data loaders
import { searchResultLoader, watchVideoLoader } from "./utils";
import store from "./context/redux/store/store.js";
import { Provider } from "react-redux";
import NoVideo from "./components/watch/NoVideo.jsx";

// Importing pages
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchVideo = lazy(() => import("./pages/WatchVideo.jsx"));
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Channel = lazy(() => import("./pages/Channel.jsx"));
const SearchResult = lazy(() => import("./pages/SearchResult.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
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
        path: "/watch",
        element: (
          <Suspense fallback={<WatchVideoLoader />}>
            <WatchVideo />
          </Suspense>
        ),
        loader: watchVideoLoader,
        errorElement: <NoVideo />,
      },
      {
        path: "/:handle",
        element: (
          <Suspense>
            <Channel />
          </Suspense>
        ),
        errorElement: <NotFound />
      },
      {
        path: "/results",
        element: (
          <Suspense>
            <SearchResult />
          </Suspense>
        ),
        loader: searchResultLoader,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Auth />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
