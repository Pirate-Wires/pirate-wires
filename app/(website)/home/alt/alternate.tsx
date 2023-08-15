import Container from "@/components/container";
import PostList from "@/components/postlist";
import PostListSmall from "@/components/postlist-small";

export default function AltHome({ posts }) {
  return (
    <>
      <Container>
        <div className="grid ">
          {posts.slice(0, 1).map(post => (
            // @ts-ignore
            <PostList
              key={post._id}
              post={post}
              minimal={true}
              aspect="landscape"
              fontWeight="large"
              preloadImage={true}
            />
          ))}
        </div>
        <div className="grid gap-10 mt-20 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {posts.slice(1, 4).map(post => (
            // @ts-ignore
            <PostList key={post._id} post={post} aspect="square" />
          ))}
        </div>

        <div className="divider my-60" />

        <div className="grid gap-10 mt-20 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {posts.slice(4).map(post => (
            // @ts-ignore
            <PostListSmall key={post._id} post={post} aspect="landscape" />
          ))}
        </div>
      </Container>
    </>
  );
}
