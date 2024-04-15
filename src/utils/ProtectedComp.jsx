import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function ProtectedComp({ children }) {
  const { isSignedIn } = useAuth();

  return <>{isSignedIn ? children : <Navigate to={"/auth"} />}</>;
}

export default ProtectedComp;
