import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.removeItem("userData");
      }
    }
    setIsLoading(false);
  }, []);

  const setUser = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserState(userData);
    setIsAuthenticated(true);
  };

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setUserState(updatedUser);
  };

  const clearUser = () => {
    localStorage.removeItem("userData");
    setUserState(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        clearUser,
        isAuthenticated,
        isLoading,
        token: user?.token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
