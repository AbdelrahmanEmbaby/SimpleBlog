import PostMeta from "./PostMeta";
import PostTags from "./PostTags";
import { Markdown } from "./Markdown";
import LazyImage from "./LazyImage";
export default function PostModal({ modalRef, post, onClose }) {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box scrollbar max-w-5xl max-h-[95vh] p-8 flex flex-col gap-4">
        <form method="dialog" className="absolute right-2 top-2">
          <button className="btn btn-sm btn-ghost btn-circle" onClick={onClose}>
            <svg
              viewBox="-0.5 0 25 25"
              className="w-4 aspect-square"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3 21.32L21 3.32001"
                  className="stroke-gray-800"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 3.32001L21 21.32"
                  className="stroke-gray-800"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        </form>

        <div>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <PostMeta post={post} />
        </div>

        {post.image && (
          <LazyImage
            className="max-w-xl rounded"
            src={post.image}
            alt={post.title}
            loading="lazy"
            imgClassName="w-fit aspect-video object-cover"
          />
        )}

        <article>
          <Markdown content={post.content} />
        </article>

        <PostTags tags={post.tags} />
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
