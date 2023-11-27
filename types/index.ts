export interface Post {
  slug: {
    current: string;
  };
  title: string;
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
    blurDataURL: string;
  };
  publishedAt: string;
  _createdAt: string;
  excerpt: string;
  author: {
    name: string;
    slug: {
      current: string;
    };
  };
}

export interface User {
  id: string;
  email: string;
}
