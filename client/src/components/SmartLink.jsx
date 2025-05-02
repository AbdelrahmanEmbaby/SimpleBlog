import { Link, useLocation } from "react-router-dom";

export default function SmartLink({
  to,
  children,
  exact = false,
  activeClassName = "active",
  inactiveClassName = "",
  ...props
}) {
  const location = useLocation();

  const getPath = (destination) => {
    if (typeof destination === "string") return destination;
    if (destination?.pathname) return destination.pathname;
    return "/";
  };

  const currentPath = location.pathname;
  const targetPath = getPath(to);

  const isActive = exact
    ? currentPath === targetPath
    : currentPath.startsWith(targetPath);

  if (isActive) {
    return (
      <span
        className={`current-link ${activeClassName}`}
        aria-current="page"
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <Link to={to} className={inactiveClassName} {...props}>
      {children}
    </Link>
  );
}
