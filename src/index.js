import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Root from "./screens/root";
import ErrorPage from "./screens/ErrorPage";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import NewEntry from "./screens/NewEntry";
import Auth from "./screens/Auth";
import store from "./redux/store";
import {
  ClerkProvider,
  AuthenticateWithRedirectCallback,
} from "@clerk/clerk-react";
import "./index.css";
import ProtectedComp from "./utils/ProtectedComp";
import { pdfjs } from "react-pdf";
import { PrimeReactProvider } from "primereact/api";

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
      {
        path: "/new",
        element: <NewEntry />,
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
      <Provider store={store}>
        <PrimeReactProvider>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
