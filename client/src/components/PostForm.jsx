import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPost, getPostByID, updatePost } from "../utils/posts.util";
import { useUserContext } from "../hooks/useUserContext";
import PostModal from "./PostModal";
import ImageUploader from "./ImageUploader";
import ResponseNotification from "./ResponseNotification";

const DRAFT_POST_KEY = "draft_post";

export default function PostForm({ postID }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const location = useLocation();
  const { user, clearUser, isAuthenticated } = useUserContext();

  const isEditing = postID && location.pathname.startsWith("/post/edit");

  const defaultPostForm = {
    author_id: {
      first_name: user.first_name,
      last_name: user.last_name,
      _id: user._id,
    },
    title: "",
    content: "",
    image: "",
    tags: "",
  };
  const [initialPostForm, setInitialPostForm] = useState(defaultPostForm);

  const [postForm, setPostForm] = useState(defaultPostForm);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ status: "", message: "" });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(
      JSON.stringify({
        title: postForm.title.trim(),
        content: postForm.content.trim(),
        image: postForm.image,
        tags: postForm.tags.trim(),
      }) !==
        JSON.stringify({
          title: initialPostForm.title.trim(),
          content: initialPostForm.content.trim(),
          image: initialPostForm.image,
          tags: initialPostForm.tags.trim(),
        })
    );
  }, [postForm]);

  useEffect(() => {
    if (hasChanges && !isEditing) {
      localStorage.setItem(DRAFT_POST_KEY, JSON.stringify(postForm));
    }
  }, [postForm, hasChanges]);

  useEffect(() => {
    if (!isEditing) {
      const draft = localStorage.getItem(DRAFT_POST_KEY);
      if (draft) {
        setInitialPostForm(JSON.parse(draft));
        setPostForm(JSON.parse(draft));
      }
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await getPostByID(postID);

        if (!isAuthenticated || user._id !== data.author_id._id) {
          navigate("/");
          return;
        }

        const formattedData = {
          ...data,
          tags: data.tags.join(","),
        };
        setInitialPostForm(formattedData);
        setPostForm(formattedData);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    if (isEditing) fetchPost();
  }, [postID]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  const removeImg = () => {
    setPostForm((prev) => ({ ...prev, image: "" }));
  };

  const preview = (e) => {
    e.preventDefault();
    dialogRef.current.showModal();
  };

  const handleImageUpload = (url) => {
    setPostForm((prev) => ({ ...prev, image: url }));
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setPostForm(initialPostForm);
    if (!isEditing) {
      localStorage.removeItem(DRAFT_POST_KEY);
    }
  };

  const formatTags = (tags) => {
    return tags.split(",").map((tag) => tag.trim().toLowerCase().replace(" ", "_"));
  };

  const addPost = async () => {
    try {
      await createPost({
        title: postForm.title.trim(),
        content: postForm.content.trim(),
        image: postForm.image,
        tags: formatTags(postForm.tags),
      });
      localStorage.removeItem(DRAFT_POST_KEY);
      setResponse({ status: "success", message: "Post created successfully" });
    } catch (error) {
      setResponse({ status: "error", message: error.message });
    }
  };

  const editPost = async () => {
    try {
      await updatePost(postID, {
        title: postForm.title.trim(),
        content: postForm.content.trim(),
        image: postForm.image,
        tags: formatTags(postForm.tags),
      });
      setResponse({ status: "success", message: "Post updated successfully" });
    } catch (error) {
      setResponse({ status: "error", message: error.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) await editPost();
      else await addPost();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response.status === "success") {
      setTimeout(() => navigate("/"), 2000);
    } else if (
      response.status === "error" &&
      response.message === "Session expired, please login again."
    ) {
      setTimeout(() => clearUser(), 2000);
    }
  }, [response]);

  return (
    <div>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 md:flex-row md:gap-10 lg:gap-15">
          <div className="flex flex-col gap-4 flex-1/2 lg:flex-1/3">
            <fieldset className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                className="input w-full text-base"
                type="text"
                id="title"
                name="title"
                value={postForm.title}
                onChange={handleFormChange}
                required
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label htmlFor="image">Image</label>
              <ImageUploader
                existingImageUrl={postForm.image}
                onImageUpload={handleImageUpload}
                onRemove={removeImg}
                inputProps={{ required: true }}
                handleLoading={handleLoading}
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label htmlFor="tags">Tags</label>
              <input
                className="input w-full text-base"
                type="text"
                id="tags"
                name="tags"
                value={postForm.tags}
                onChange={handleFormChange}
                required
              />
              <p className="label">Example: css,js</p>
            </fieldset>
          </div>
          <div className="flex-1/2 lg:flex-2/3">
            <fieldset className="flex flex-col gap-2">
              <label htmlFor="content">Content</label>
              <textarea
                className={`textarea resize-none w-full h-120 overflow-scroll scrollbar text-base ${
                  postForm.content || "text-xl"
                }`}
                id="content"
                name="content"
                value={postForm.content}
                onChange={handleFormChange}
                placeholder="✨ This magic box speaks Markdown!"
                required
              />
            </fieldset>
          </div>
        </div>

        <div className="flex justify-end gap-4 mb-8 md:mb-0">
          <button
            className={`w-fit btn btn-soft btn-neutral shadow-none ${
              ((!hasChanges && isEditing) || isLoading) && "btn-disabled"
            }`}
            onClick={resetForm}
            disabled={(!hasChanges && isEditing) || isLoading}
          >
            Reset
          </button>

          <button
            className="w-fit btn btn-soft btn-neutral shadow-none"
            type="button"
            onClick={preview}
          >
            Preview
          </button>

          <button
            className={`w-fit btn btn-soft btn-primary shadow-none ${
              ((!hasChanges && isEditing) || isLoading) && "btn-disabled"
            }`}
            type="submit"
            disabled={(!hasChanges && isEditing) || isLoading}
          >
            Submit
          </button>
        </div>
      </form>

      <PostModal
        modalRef={dialogRef}
        post={{
          ...postForm,
          tags: postForm.tags ? formatTags(postForm.tags) : [],
        }}
        onClose={() => dialogRef.current.close()}
      />

      <ResponseNotification
        apiResponse={response}
        className="top-20 left-1/2 -translate-x-1/2 transform lg:top-20"
      />
    </div>
  );
}
