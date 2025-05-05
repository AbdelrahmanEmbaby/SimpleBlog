import { useEffect, useRef, useState } from "react";

import PostHeader from "./PostHeader";
import PostMeta from "./PostMeta";
import PostTags from "./PostTags";
import PostModal from "./PostModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import LazyImage from "./LazyImage";
import { Markdown } from "./Markdown";

import { MAX_POST_CONTENT_LENGTH } from "../config/constants.config";

import { deletePost } from "../utils/posts.util";

import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function PostCard({ post }) {
  const [firstPart, rest] = [
    post.content.slice(0, MAX_POST_CONTENT_LENGTH),
    post.content.slice(MAX_POST_CONTENT_LENGTH),
  ];

  const dialogRef = useRef(null);
  const deleteDialogRef = useRef(null);

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    const response = await deletePost(post._id);
    response.data && setIsDeleted(true);
  };

  const [postRef, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
  return (
    <div
      className={`
        ${isDeleted ? "max-h-0" : "max-h-[200rem]"}
        overflow-hidden
        ${isVisible ? "opacity-100 translate-y-0 transform-none" : "opacity-0 transform translate-y-4 scale-90"}
        transition-all duration-300 ease-in
        `}
      ref={postRef}
    >
      <section className="flex flex-col py-8 gap-4 border-b border-gray-300">
        <div>
          <PostHeader
            post={post}
            onDeleteClick={() => deleteDialogRef.current.showModal()}
          />
          <PostMeta post={post} />
        </div>

        <LazyImage
          className="max-w-xl rounded"
          src={post.image}
          alt={post.title}
          loading="lazy"
          imgClassName="w-fit aspect-video object-cover"
        />

        <article>
          <Markdown content={`${firstPart} ${rest && "<span>...</span>"}`} />
        </article>

        {rest && (
          <button
            onClick={() => dialogRef.current.showModal()}
            className="w-fit text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Read Full Post
          </button>
        )}

        <PostTags tags={post.tags} />

        <PostModal
          modalRef={dialogRef}
          post={post}
          onClose={() => dialogRef.current.close()}
        />

        <DeleteConfirmationModal
          modalRef={deleteDialogRef}
          onCancel={() => deleteDialogRef.current.close()}
          onConfirm={() => {
            deleteDialogRef.current.close();
            handleDelete();
          }}
          itemType="post"
        />
      </section>
    </div>
  );
}
