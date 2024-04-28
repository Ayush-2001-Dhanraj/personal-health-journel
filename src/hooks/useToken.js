import { useState, useEffect } from "react";
import { useSession } from "@clerk/clerk-react";

const useToken = () => {
  const [token, setToken] = useState(null);

  const { session, isLoaded } = useSession();

  const retrieveToken = async () => {
    const tk = await session.getToken();
    setToken(tk);
  };

  useEffect(() => {
    retrieveToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, session]);

  return [token];
};

export default useToken;
