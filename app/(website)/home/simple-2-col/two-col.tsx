import Container from "@/components/container";
import PostAlt from "@/components/postalt";

export default function HomeTwoCol({ posts }) {
  return (
    <>

      <Container alt={true}>
        <div className="hidden lg:px-12 lg:block">
          <h3 className="font-medium text-gray-600">Most Recent</h3>
        </div>
        <div className="grid gap-10 lg:mt-5 lg:gap-12 lg:px-12">
          {posts.slice(0, 1).map(post => (
            <PostAlt
              key={post._id}
              post={post}
              aspect="landscape"
              featured={true}
              preloadImage={true}
            />
          ))}
        </div>
        <div className="hidden mt-10 lg:px-12 lg:block">
          <h3 className="font-medium text-gray-600">
            Earlier Articles
          </h3>
        </div>
        <div className="grid gap-10 mt-10 lg:mt-5 lg:gap-12 lg:gap-y-16 md:grid-cols-2 lg:px-12">
          {posts.slice(1).map(post => (
            //  @ts-ignore
            <PostAlt key={post._id} post={post} aspect="landscape" />
          ))}
        </div>
      </Container>
    </>
  );
}
