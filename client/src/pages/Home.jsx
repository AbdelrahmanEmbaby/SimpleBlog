import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useUserContext } from "../hooks/useUserContext";

import { getPostsByPage } from "../utils/posts.util";

import Navbar from "../components/Navbar";
import InfiniteScrollPosts from "../components/InfiniteScrollPosts";

export default function Home() {
  const defaultPagination = {
    page: 1,
    limit: 4,
    totalPosts: 0,
    totalPages: 0,
    hasMore: true,
  };
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(defaultPagination.page);
  const [hasMore, setHasMore] = useState(defaultPagination.hasMore);

  const { isAuthenticated } = useUserContext();

  const incrementPage = () => setPage((prevPage) => prevPage + 1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, message } = await getPostsByPage(
          page,
          defaultPagination.limit
        );
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasMore(data.pagination.hasMore);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <InfiniteScrollPosts
          posts={posts}
          hasMore={hasMore}
          pageHandler={{ incrementPage }}
        />
      </main>
      <div className="sticky bottom-1/15 left-14/15 w-fit flex flex-col gap-4 z-10">
        <a
          href="#"
          className="w-12 h-12 md:w-15 md:h-15 btn btn-circle avatar text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 md:w-7 aspect-square"
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
                d="M5 15L10 9.84985C10.2563 9.57616 10.566 9.35814 10.9101 9.20898C11.2541 9.05983 11.625 8.98291 12 8.98291C12.375 8.98291 12.7459 9.05983 13.0899 9.20898C13.434 9.35814 13.7437 9.57616 14 9.84985L19 15"
                className="stroke-gray-800"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </a>
        {isAuthenticated && (
          <Link
            to="/post/create"
            className="w-12 h-12 md:w-15 md:h-15 btn btn-success btn-circle avatar text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 md:w-7 aspect-square"
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
                  d="M4 12H20M12 4V20"
                  className="stroke-white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
