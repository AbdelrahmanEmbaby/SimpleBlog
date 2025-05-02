import { useState, useCallback, useEffect } from "react";
import LazyImage from "./LazyImage";
import { uploadImage } from "../utils/posts.util";
import { isImage } from "../utils/validate.util";

export default function ImageUploader({
  existingImageUrl = "",
  onImageUpload,
  onRemove,
  inputProps,
  handleLoading,
  ...props
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (handleLoading) {
      handleLoading(isUploading);
    }
  }, [isUploading, handleLoading]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setError(null);

      if (!isImage(file)) {
        setError(
          "Please upload a valid image file (JPEG, JPG, PNG, GIF, or WEBP)"
        );
        return;
      }

      try {
        setIsUploading(true);

        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        const result = await uploadImage(file);

        onImageUpload(result.imageUrl);
      } catch (err) {
        console.error("Upload error:", err);
        setError(err.message || "Failed to upload image");
        setPreviewUrl("");
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUpload]
  );

  const handleRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
    onRemove();
    setError(null);
  }, [previewUrl, onRemove]);

  if (existingImageUrl) {
    return (
      <div className="w-full sm:w-3/4 relative">
        <LazyImage
          className="flex justify-center items-center w-fit md:max-h-60"
          src={existingImageUrl}
          alt="Uploaded content"
          removable={true}
          onRemove={handleRemove}
          imgClassName="md:h-60"
        />
      </div>
    );
  }

  // Show preview during upload
  if (previewUrl) {
    return (
      <div className="w-full sm:w-3/4 relative">
        <LazyImage
          className="flex justify-center items-center w-fit md:max-h-60"
          src={previewUrl}
          alt="Upload preview"
          removable={true}
          onRemove={handleRemove}
          imgClassName="md:h-60"
        />
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <span className="text-gray-800 text-lg flex gap-2">
              <p className="loading loading-spinner text-primary"></p>
              <p>Uploading</p>
            </span>
          </div>
        )}
      </div>
    );
  }

  // Show file input by default
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <input
          className="file-input w-full"
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          {...inputProps}
        />
        {isUploading && <span className="text-gray-500">Uploading...</span>}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
