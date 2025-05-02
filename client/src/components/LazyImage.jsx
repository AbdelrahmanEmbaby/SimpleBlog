import { useState } from "react";

export default function LazyImage({
  src,
  alt,
  className,
  removable,
  onRemove,
  imgClassName,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative ${className} ${!isLoaded && "flex justify-center items-center"}`}>
      {!isLoaded && (
        <span className="loading loading-spinner loading-lg text-primary"></span>
      )}
      <img
        className={`object-cover rounded ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 ease-in ${imgClassName}`}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      {removable && (
        <button
          className="btn btn-sm btn-circle absolute top-2 right-2"
          onClick={onRemove}
        >
          <svg
            viewBox="-0.5 0 25 25"
            className="w-3 aspect-square"
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
                d="M3 21.32L21 3.32001"
                className="stroke-gray-800"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M3 3.32001L21 21.32"
                className="stroke-gray-800"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      )}
    </div>
  );
}
