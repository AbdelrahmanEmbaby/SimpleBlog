import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

export default function PostHeader({ post, onDeleteClick }) {
  const { user } = useUserContext();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{post.title}</h1>
      {post.author_id._id === user?._id && (
        <div className="dropdown dropdown-end z-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost px-1 h-fit avatar"
          >
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 aspect-square"
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
                    d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  ></circle>{" "}
                  <path
                    d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm gap-2 dropdown-content bg-base-100 rounded-box mt-2 p-2 shadow"
          >
            <li>
              <Link
                to={`/post/edit/${post._id}`}
                className="btn btn-neutral btn-soft shadow-none text-base border-none font-medium"
              >
                Edit
              </Link>
            </li>
            <li>
              <button
                className="btn btn-error btn-soft text-base border-none shadow-none font-medium hover:text-white"
                onClick={onDeleteClick}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
