import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";

export default function CreatePost() {

  return (
    <div>
      <Navbar />
      <main className="flex flex-col gap-6 px-8">
        <h1 className="text-2xl md:text-4xl font-bold">Create Post</h1>
        <PostForm />
      </main>
    </div>
  );
}
