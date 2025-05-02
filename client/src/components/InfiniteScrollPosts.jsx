import LoadingScreen from "./LoadingScreen";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InfiniteScrollPosts({ posts, hasMore, pageHandler }) {
  const { incrementPage } = pageHandler;
  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => incrementPage()}
        hasMore={hasMore}
        loader={<LoadingScreen />}
        endMessage={
          <div>
            <p className="text-center py-4 font-bold">
              Yay! You have seen it all
            </p>
          </div>
        }
        className="flex flex-col px-10 sm:px-15 md:px-30 lg:px-45 xl:px-60"
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
