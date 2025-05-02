import { useScroll } from "../hooks/useScroll";
import { useUserContext } from "../hooks/useUserContext";

import { Link } from "react-router-dom";
import SmartLink from "./SmartLink";

export default function Navbar() {
  const hasScrolled = useScroll();
  const { isAuthenticated, clearUser } = useUserContext();
  return (
    <nav
      className={`
        z-10
        ${hasScrolled ? "shadow" : ""}
        sticky top-0 flex items-center justify-between p-4 bg-white/70 backdrop-blur sm:p-6
      `}
    >
      <h1 className="text-2xl font-semibold">Simple Blog</h1>
      <div className="dropdown dropdown-end sm:hidden">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="flex items-center justify-center">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm gap-2 dropdown-content bg-base-100 rounded-box z-1 mt-2 p-2 shadow"
        >
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to={"/signin"}
                  className="btn btn-neutral btn-soft shadow-none text-base border-none font-medium"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className="btn btn-primary btn-soft shadow-none text-base border-none font-medium"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <SmartLink
                  to={"/"}
                  exact={true}
                  className="btn btn-soft shadow-none btn-neutral text-base border-none font-medium"
                >
                  Posts
                </SmartLink>
              </li>
              <li>
                <a
                  className="btn btn-error btn-soft text-base border-none shadow-none hover:text-white font-medium"
                  onClick={clearUser}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="hidden sm:flex">
        <ul className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to={"/signin"}
                  className="btn btn-neutral btn-soft shadow-none text-base border-none font-medium"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className="btn btn-primary btn-soft shadow-none text-base border-none font-medium"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <SmartLink
                  to={"/"}
                  exact={true}
                  className="btn btn-soft shadow-none btn-neutral text-base border-none font-medium"
                >
                  Posts
                </SmartLink>
              </li>
              <li>
                <a
                  className="btn btn-error btn-soft text-base border-none shadow-none hover:text-white font-medium"
                  onClick={clearUser}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
