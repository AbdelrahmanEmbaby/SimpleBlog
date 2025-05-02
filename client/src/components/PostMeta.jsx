import { formatDistanceToNow } from "date-fns";

export default function PostMeta({ post }) {
  return (
    <p className="text-sm flex gap-1">
      <span>
        Author: {post.author_id.first_name} {post.author_id.last_name}
      </span>
      <span className="text-sm text-gray-600">
        {formatDistanceToNow(new Date(post.publish_date || Date.now()))} ago
      </span>
    </p>
  );
}
