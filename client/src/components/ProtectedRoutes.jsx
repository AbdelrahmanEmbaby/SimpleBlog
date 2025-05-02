import { useUserContext } from "../hooks/useUserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoutes() {
  const { isAuthenticated } = useUserContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function GuestOnlyRoutes() {
  const { isAuthenticated } = useUserContext();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function NeutralRoutes() {
  return <Outlet />;
}
