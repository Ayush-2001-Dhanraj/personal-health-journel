import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const useToken = () => {
  const [token, setToken] = useState(null);

  const { getToken, isLoaded } = useAuth();

  const retrieveUserData = async () => {
    const tk = await getToken();
    setToken(tk);
  };

  useEffect(() => {
    retrieveUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return [token];
};

export default useToken;
