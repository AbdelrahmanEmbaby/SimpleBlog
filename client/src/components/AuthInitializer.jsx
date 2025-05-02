import { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import LoadingScreen from "./LoadingScreen";

export default function AuthInitializer({ children }) {
  const { isLoading } = useUserContext();
  const [minLoadingPassed, setMinLoadingPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingPassed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !minLoadingPassed) {
    return <LoadingScreen />;
  }

  return children;
}
