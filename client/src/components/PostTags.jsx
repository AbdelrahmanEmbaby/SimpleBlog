export default function PostTags({ tags }) {
  return (
    <p>
      {tags.map((tag) => (
        <span className="text-sm text-gray-600" key={tag}>
          #{tag}{" "}
        </span>
      ))}
    </p>
  );
}
