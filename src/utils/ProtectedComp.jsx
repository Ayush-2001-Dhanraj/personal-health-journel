import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import starterService from "../services/starterService";

function ProtectedComp({ children }) {
  const { isSignedIn } = useAuth();

  const triggerBackend = async () => await starterService.startBackend();

  useEffect(() => {
    triggerBackend();
  }, []);

  return <>{isSignedIn ? children : <Navigate to={"/auth"} />}</>;
}

export default ProtectedComp;
