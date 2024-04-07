import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Root from "./screens/root";
import ErrorPage from "./screens/ErrorPage";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import Auth from "./screens/Auth";
import store from "./store";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import ProtectedComp from "./utils/ProtectedComp";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedComp>
        <Root />
      </ProtectedComp>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
