import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";

import { useParams } from "react-router-dom";

export default function CreatePost() {

  const postID = useParams().id;
  return (
    <div>
      <Navbar />
      <main className="flex flex-col gap-6 px-8">
        <h1 className="text-2xl lg:text-4xl font-bold mt-5">
          Edit Post <span className="label"></span>
        </h1>
        <PostForm postID={postID} />
      </main>
    </div>
  );
}
