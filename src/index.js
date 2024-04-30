import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Root from "./screens/root";
import ErrorPage from "./screens/ErrorPage";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import Auth from "./screens/Auth";
import store from "./redux/store";
import {
  ClerkProvider,
  AuthenticateWithRedirectCallback,
} from "@clerk/clerk-react";
import "./index.css";
import ProtectedComp from "./utils/ProtectedComp";
import { Worker } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";

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
  {
    path: "/sso-callback",
    element: <AuthenticateWithRedirectCallback />,
    errorElement: <ErrorPage />,
  },
]);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Worker>
    </ClerkProvider>
  </React.StrictMode>
);
