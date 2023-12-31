/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/comment_with_author": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comment_with_author.id"];
          slug?: parameters["rowFilter.comment_with_author.slug"];
          createdAt?: parameters["rowFilter.comment_with_author.createdAt"];
          updatedAt?: parameters["rowFilter.comment_with_author.updatedAt"];
          title?: parameters["rowFilter.comment_with_author.title"];
          content?: parameters["rowFilter.comment_with_author.content"];
          isPublished?: parameters["rowFilter.comment_with_author.isPublished"];
          authorId?: parameters["rowFilter.comment_with_author.authorId"];
          parentId?: parameters["rowFilter.comment_with_author.parentId"];
          live?: parameters["rowFilter.comment_with_author.live"];
          siteId?: parameters["rowFilter.comment_with_author.siteId"];
          isPinned?: parameters["rowFilter.comment_with_author.isPinned"];
          isDeleted?: parameters["rowFilter.comment_with_author.isDeleted"];
          isApproved?: parameters["rowFilter.comment_with_author.isApproved"];
          author?: parameters["rowFilter.comment_with_author.author"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["comment_with_author"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
  "/comments_linear_view": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comments_linear_view.id"];
          slug?: parameters["rowFilter.comments_linear_view.slug"];
          createdAt?: parameters["rowFilter.comments_linear_view.createdAt"];
          updatedAt?: parameters["rowFilter.comments_linear_view.updatedAt"];
          title?: parameters["rowFilter.comments_linear_view.title"];
          content?: parameters["rowFilter.comments_linear_view.content"];
          isPublished?: parameters["rowFilter.comments_linear_view.isPublished"];
          authorId?: parameters["rowFilter.comments_linear_view.authorId"];
          parentId?: parameters["rowFilter.comments_linear_view.parentId"];
          live?: parameters["rowFilter.comments_linear_view.live"];
          siteId?: parameters["rowFilter.comments_linear_view.siteId"];
          isPinned?: parameters["rowFilter.comments_linear_view.isPinned"];
          isDeleted?: parameters["rowFilter.comments_linear_view.isDeleted"];
          isApproved?: parameters["rowFilter.comments_linear_view.isApproved"];
          author?: parameters["rowFilter.comments_linear_view.author"];
          parent?: parameters["rowFilter.comments_linear_view.parent"];
          responses?: parameters["rowFilter.comments_linear_view.responses"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["comments_linear_view"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
  "/comments_thread": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comments_thread.id"];
          slug?: parameters["rowFilter.comments_thread.slug"];
          createdAt?: parameters["rowFilter.comments_thread.createdAt"];
          updatedAt?: parameters["rowFilter.comments_thread.updatedAt"];
          title?: parameters["rowFilter.comments_thread.title"];
          content?: parameters["rowFilter.comments_thread.content"];
          isPublished?: parameters["rowFilter.comments_thread.isPublished"];
          authorId?: parameters["rowFilter.comments_thread.authorId"];
          parentId?: parameters["rowFilter.comments_thread.parentId"];
          live?: parameters["rowFilter.comments_thread.live"];
          siteId?: parameters["rowFilter.comments_thread.siteId"];
          isPinned?: parameters["rowFilter.comments_thread.isPinned"];
          isDeleted?: parameters["rowFilter.comments_thread.isDeleted"];
          isApproved?: parameters["rowFilter.comments_thread.isApproved"];
          author?: parameters["rowFilter.comments_thread.author"];
          votes?: parameters["rowFilter.comments_thread.votes"];
          upvotes?: parameters["rowFilter.comments_thread.upvotes"];
          downvotes?: parameters["rowFilter.comments_thread.downvotes"];
          depth?: parameters["rowFilter.comments_thread.depth"];
          path?: parameters["rowFilter.comments_thread.path"];
          pathVotesRecent?: parameters["rowFilter.comments_thread.pathVotesRecent"];
          pathLeastRecent?: parameters["rowFilter.comments_thread.pathLeastRecent"];
          pathMostRecent?: parameters["rowFilter.comments_thread.pathMostRecent"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["comments_thread"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
  "/comments_thread_with_user_vote": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comments_thread_with_user_vote.id"];
          slug?: parameters["rowFilter.comments_thread_with_user_vote.slug"];
          createdAt?: parameters["rowFilter.comments_thread_with_user_vote.createdAt"];
          updatedAt?: parameters["rowFilter.comments_thread_with_user_vote.updatedAt"];
          title?: parameters["rowFilter.comments_thread_with_user_vote.title"];
          content?: parameters["rowFilter.comments_thread_with_user_vote.content"];
          isPublished?: parameters["rowFilter.comments_thread_with_user_vote.isPublished"];
          authorId?: parameters["rowFilter.comments_thread_with_user_vote.authorId"];
          parentId?: parameters["rowFilter.comments_thread_with_user_vote.parentId"];
          live?: parameters["rowFilter.comments_thread_with_user_vote.live"];
          siteId?: parameters["rowFilter.comments_thread_with_user_vote.siteId"];
          isPinned?: parameters["rowFilter.comments_thread_with_user_vote.isPinned"];
          isDeleted?: parameters["rowFilter.comments_thread_with_user_vote.isDeleted"];
          isApproved?: parameters["rowFilter.comments_thread_with_user_vote.isApproved"];
          author?: parameters["rowFilter.comments_thread_with_user_vote.author"];
          votes?: parameters["rowFilter.comments_thread_with_user_vote.votes"];
          upvotes?: parameters["rowFilter.comments_thread_with_user_vote.upvotes"];
          downvotes?: parameters["rowFilter.comments_thread_with_user_vote.downvotes"];
          depth?: parameters["rowFilter.comments_thread_with_user_vote.depth"];
          path?: parameters["rowFilter.comments_thread_with_user_vote.path"];
          pathVotesRecent?: parameters["rowFilter.comments_thread_with_user_vote.pathVotesRecent"];
          pathLeastRecent?: parameters["rowFilter.comments_thread_with_user_vote.pathLeastRecent"];
          pathMostRecent?: parameters["rowFilter.comments_thread_with_user_vote.pathMostRecent"];
          userVoteValue?: parameters["rowFilter.comments_thread_with_user_vote.userVoteValue"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["comments_thread_with_user_vote"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
  "/comments_with_author_votes": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comments_with_author_votes.id"];
          slug?: parameters["rowFilter.comments_with_author_votes.slug"];
          createdAt?: parameters["rowFilter.comments_with_author_votes.createdAt"];
          updatedAt?: parameters["rowFilter.comments_with_author_votes.updatedAt"];
          title?: parameters["rowFilter.comments_with_author_votes.title"];
          content?: parameters["rowFilter.comments_with_author_votes.content"];
          isPublished?: parameters["rowFilter.comments_with_author_votes.isPublished"];
          authorId?: parameters["rowFilter.comments_with_author_votes.authorId"];
          parentId?: parameters["rowFilter.comments_with_author_votes.parentId"];
          live?: parameters["rowFilter.comments_with_author_votes.live"];
          siteId?: parameters["rowFilter.comments_with_author_votes.siteId"];
          isPinned?: parameters["rowFilter.comments_with_author_votes.isPinned"];
          isDeleted?: parameters["rowFilter.comments_with_author_votes.isDeleted"];
          isApproved?: parameters["rowFilter.comments_with_author_votes.isApproved"];
          author?: parameters["rowFilter.comments_with_author_votes.author"];
          votes?: parameters["rowFilter.comments_with_author_votes.votes"];
          upvotes?: parameters["rowFilter.comments_with_author_votes.upvotes"];
          downvotes?: parameters["rowFilter.comments_with_author_votes.downvotes"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["comments_with_author_votes"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
  "/posts": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          slug?: parameters["rowFilter.posts.slug"];
          createdAt?: parameters["rowFilter.posts.createdAt"];
          updatedAt?: parameters["rowFilter.posts.updatedAt"];
          title?: parameters["rowFilter.posts.title"];
          content?: parameters["rowFilter.posts.content"];
          isPublished?: parameters["rowFilter.posts.isPublished"];
          authorId?: parameters["rowFilter.posts.authorId"];
          parentId?: parameters["rowFilter.posts.parentId"];
          live?: parameters["rowFilter.posts.live"];
          siteId?: parameters["rowFilter.posts.siteId"];
          isPinned?: parameters["rowFilter.posts.isPinned"];
          isDeleted?: parameters["rowFilter.posts.isDeleted"];
          isApproved?: parameters["rowFilter.posts.isApproved"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["posts"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          slug?: parameters["rowFilter.posts.slug"];
          createdAt?: parameters["rowFilter.posts.createdAt"];
          updatedAt?: parameters["rowFilter.posts.updatedAt"];
          title?: parameters["rowFilter.posts.title"];
          content?: parameters["rowFilter.posts.content"];
          isPublished?: parameters["rowFilter.posts.isPublished"];
          authorId?: parameters["rowFilter.posts.authorId"];
          parentId?: parameters["rowFilter.posts.parentId"];
          live?: parameters["rowFilter.posts.live"];
          siteId?: parameters["rowFilter.posts.siteId"];
          isPinned?: parameters["rowFilter.posts.isPinned"];
          isDeleted?: parameters["rowFilter.posts.isDeleted"];
          isApproved?: parameters["rowFilter.posts.isApproved"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          slug?: parameters["rowFilter.posts.slug"];
          createdAt?: parameters["rowFilter.posts.createdAt"];
          updatedAt?: parameters["rowFilter.posts.updatedAt"];
          title?: parameters["rowFilter.posts.title"];
          content?: parameters["rowFilter.posts.content"];
          isPublished?: parameters["rowFilter.posts.isPublished"];
          authorId?: parameters["rowFilter.posts.authorId"];
          parentId?: parameters["rowFilter.posts.parentId"];
          live?: parameters["rowFilter.posts.live"];
          siteId?: parameters["rowFilter.posts.siteId"];
          isPinned?: parameters["rowFilter.posts.isPinned"];
          isDeleted?: parameters["rowFilter.posts.isDeleted"];
          isApproved?: parameters["rowFilter.posts.isApproved"];
        };
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          user_metadata?: parameters["rowFilter.profiles.user_metadata"];
          full_name?: parameters["rowFilter.profiles.full_name"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          user_metadata?: parameters["rowFilter.profiles.user_metadata"];
          full_name?: parameters["rowFilter.profiles.full_name"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          user_metadata?: parameters["rowFilter.profiles.user_metadata"];
          full_name?: parameters["rowFilter.profiles.full_name"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/sites": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.sites.id"];
          siteDomain?: parameters["rowFilter.sites.siteDomain"];
          ownerId?: parameters["rowFilter.sites.ownerId"];
          name?: parameters["rowFilter.sites.name"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["sites"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** sites */
          sites?: definitions["sites"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.sites.id"];
          siteDomain?: parameters["rowFilter.sites.siteDomain"];
          ownerId?: parameters["rowFilter.sites.ownerId"];
          name?: parameters["rowFilter.sites.name"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.sites.id"];
          siteDomain?: parameters["rowFilter.sites.siteDomain"];
          ownerId?: parameters["rowFilter.sites.ownerId"];
          name?: parameters["rowFilter.sites.name"];
        };
        body: {
          /** sites */
          sites?: definitions["sites"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/votes": {
    get: {
      parameters: {
        query: {
          postId?: parameters["rowFilter.votes.postId"];
          userId?: parameters["rowFilter.votes.userId"];
          value?: parameters["rowFilter.votes.value"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["votes"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** votes */
          votes?: definitions["votes"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          postId?: parameters["rowFilter.votes.postId"];
          userId?: parameters["rowFilter.votes.userId"];
          value?: parameters["rowFilter.votes.value"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          postId?: parameters["rowFilter.votes.postId"];
          userId?: parameters["rowFilter.votes.userId"];
          value?: parameters["rowFilter.votes.value"];
        };
        body: {
          /** votes */
          votes?: definitions["votes"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/get_post_by_slug": {
    post: {
      parameters: {
        body: {
          args: {
            root_slug: string;
            max_depth?: number;
            responses_limit?: number;
            responses_offset?: number;
            current_depth?: number;
            user_id?: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/handle_new_user": {
    post: {
      parameters: {
        body: {
          args: {[key: string]: any};
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/build_post_responses": {
    post: {
      parameters: {
        body: {
          args: {
            max_depth?: number;
            current_depth?: number;
            user_id?: string;
            parent_id: number;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  comment_with_author: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id?: number;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string;
    content?: string;
    isPublished?: boolean;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    authorId?: string;
    /**
     * Note:
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    parentId?: number;
    live?: boolean;
    /**
     * Note:
     * This is a Foreign Key to `sites.id`.<fk table='sites' column='id'/>
     */
    siteId?: number;
    isPinned?: boolean;
    isDeleted?: boolean;
    isApproved?: boolean;
    author?: string;
  };
  comments_linear_view: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id?: number;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string;
    content?: string;
    isPublished?: boolean;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    authorId?: string;
    /**
     * Note:
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    parentId?: number;
    live?: boolean;
    /**
     * Note:
     * This is a Foreign Key to `sites.id`.<fk table='sites' column='id'/>
     */
    siteId?: number;
    isPinned?: boolean;
    isDeleted?: boolean;
    isApproved?: boolean;
    author?: string;
    parent?: string;
    responses?: string;
  };
  comments_thread: {
    id?: number;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string;
    content?: string;
    isPublished?: boolean;
    authorId?: string;
    parentId?: number;
    live?: boolean;
    siteId?: number;
    isPinned?: boolean;
    isDeleted?: boolean;
    isApproved?: boolean;
    author?: string;
    votes?: number;
    upvotes?: number;
    downvotes?: number;
    depth?: number;
    path?: string;
    pathVotesRecent?: string;
    pathLeastRecent?: string;
    pathMostRecent?: string;
  };
  comments_thread_with_user_vote: {
    id?: number;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string;
    content?: string;
    isPublished?: boolean;
    authorId?: string;
    parentId?: number;
    live?: boolean;
    siteId?: number;
    isPinned?: boolean;
    isDeleted?: boolean;
    isApproved?: boolean;
    author?: string;
    votes?: number;
    upvotes?: number;
    downvotes?: number;
    depth?: number;
    path?: string;
    pathVotesRecent?: string;
    pathLeastRecent?: string;
    pathMostRecent?: string;
    userVoteValue?: number;
  };
  comments_with_author_votes: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id?: number;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string;
    content?: string;
    isPublished?: boolean;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    authorId?: string;
    /**
     * Note:
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    parentId?: number;
    live?: boolean;
    /**
     * Note:
     * This is a Foreign Key to `sites.id`.<fk table='sites' column='id'/>
     */
    siteId?: number;
    isPinned?: boolean;
    isDeleted?: boolean;
    isApproved?: boolean;
    author?: string;
    votes?: number;
    upvotes?: number;
    downvotes?: number;
  };
  posts: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    slug: string;
    createdAt: string;
    updatedAt?: string;
    title?: string;
    content?: string;
    isPublished: boolean;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    authorId: string;
    /**
     * Note:
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    parentId?: number;
    live?: boolean;
    /**
     * Note:
     * This is a Foreign Key to `sites.id`.<fk table='sites' column='id'/>
     */
    siteId: number;
    isPinned: boolean;
    isDeleted: boolean;
    isApproved: boolean;
  };
  profiles: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
     */
    id: string;
    updated_at?: string;
    username?: string;
    avatar_url?: string;
    website?: string;
    user_metadata?: string;
    full_name?: string;
  };
  sites: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    siteDomain: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    ownerId: string;
    name: string;
  };
  votes: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    postId: number;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    userId: string;
    value: number;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** comment_with_author */
  "body.comment_with_author": definitions["comment_with_author"];
  "rowFilter.comment_with_author.id": string;
  "rowFilter.comment_with_author.slug": string;
  "rowFilter.comment_with_author.createdAt": string;
  "rowFilter.comment_with_author.updatedAt": string;
  "rowFilter.comment_with_author.title": string;
  "rowFilter.comment_with_author.content": string;
  "rowFilter.comment_with_author.isPublished": string;
  "rowFilter.comment_with_author.authorId": string;
  "rowFilter.comment_with_author.parentId": string;
  "rowFilter.comment_with_author.live": string;
  "rowFilter.comment_with_author.siteId": string;
  "rowFilter.comment_with_author.isPinned": string;
  "rowFilter.comment_with_author.isDeleted": string;
  "rowFilter.comment_with_author.isApproved": string;
  "rowFilter.comment_with_author.author": string;
  /** comments_linear_view */
  "body.comments_linear_view": definitions["comments_linear_view"];
  "rowFilter.comments_linear_view.id": string;
  "rowFilter.comments_linear_view.slug": string;
  "rowFilter.comments_linear_view.createdAt": string;
  "rowFilter.comments_linear_view.updatedAt": string;
  "rowFilter.comments_linear_view.title": string;
  "rowFilter.comments_linear_view.content": string;
  "rowFilter.comments_linear_view.isPublished": string;
  "rowFilter.comments_linear_view.authorId": string;
  "rowFilter.comments_linear_view.parentId": string;
  "rowFilter.comments_linear_view.live": string;
  "rowFilter.comments_linear_view.siteId": string;
  "rowFilter.comments_linear_view.isPinned": string;
  "rowFilter.comments_linear_view.isDeleted": string;
  "rowFilter.comments_linear_view.isApproved": string;
  "rowFilter.comments_linear_view.author": string;
  "rowFilter.comments_linear_view.parent": string;
  "rowFilter.comments_linear_view.responses": string;
  /** comments_thread */
  "body.comments_thread": definitions["comments_thread"];
  "rowFilter.comments_thread.id": string;
  "rowFilter.comments_thread.slug": string;
  "rowFilter.comments_thread.createdAt": string;
  "rowFilter.comments_thread.updatedAt": string;
  "rowFilter.comments_thread.title": string;
  "rowFilter.comments_thread.content": string;
  "rowFilter.comments_thread.isPublished": string;
  "rowFilter.comments_thread.authorId": string;
  "rowFilter.comments_thread.parentId": string;
  "rowFilter.comments_thread.live": string;
  "rowFilter.comments_thread.siteId": string;
  "rowFilter.comments_thread.isPinned": string;
  "rowFilter.comments_thread.isDeleted": string;
  "rowFilter.comments_thread.isApproved": string;
  "rowFilter.comments_thread.author": string;
  "rowFilter.comments_thread.votes": string;
  "rowFilter.comments_thread.upvotes": string;
  "rowFilter.comments_thread.downvotes": string;
  "rowFilter.comments_thread.depth": string;
  "rowFilter.comments_thread.path": string;
  "rowFilter.comments_thread.pathVotesRecent": string;
  "rowFilter.comments_thread.pathLeastRecent": string;
  "rowFilter.comments_thread.pathMostRecent": string;
  /** comments_thread_with_user_vote */
  "body.comments_thread_with_user_vote": definitions["comments_thread_with_user_vote"];
  "rowFilter.comments_thread_with_user_vote.id": string;
  "rowFilter.comments_thread_with_user_vote.slug": string;
  "rowFilter.comments_thread_with_user_vote.createdAt": string;
  "rowFilter.comments_thread_with_user_vote.updatedAt": string;
  "rowFilter.comments_thread_with_user_vote.title": string;
  "rowFilter.comments_thread_with_user_vote.content": string;
  "rowFilter.comments_thread_with_user_vote.isPublished": string;
  "rowFilter.comments_thread_with_user_vote.authorId": string;
  "rowFilter.comments_thread_with_user_vote.parentId": string;
  "rowFilter.comments_thread_with_user_vote.live": string;
  "rowFilter.comments_thread_with_user_vote.siteId": string;
  "rowFilter.comments_thread_with_user_vote.isPinned": string;
  "rowFilter.comments_thread_with_user_vote.isDeleted": string;
  "rowFilter.comments_thread_with_user_vote.isApproved": string;
  "rowFilter.comments_thread_with_user_vote.author": string;
  "rowFilter.comments_thread_with_user_vote.votes": string;
  "rowFilter.comments_thread_with_user_vote.upvotes": string;
  "rowFilter.comments_thread_with_user_vote.downvotes": string;
  "rowFilter.comments_thread_with_user_vote.depth": string;
  "rowFilter.comments_thread_with_user_vote.path": string;
  "rowFilter.comments_thread_with_user_vote.pathVotesRecent": string;
  "rowFilter.comments_thread_with_user_vote.pathLeastRecent": string;
  "rowFilter.comments_thread_with_user_vote.pathMostRecent": string;
  "rowFilter.comments_thread_with_user_vote.userVoteValue": string;
  /** comments_with_author_votes */
  "body.comments_with_author_votes": definitions["comments_with_author_votes"];
  "rowFilter.comments_with_author_votes.id": string;
  "rowFilter.comments_with_author_votes.slug": string;
  "rowFilter.comments_with_author_votes.createdAt": string;
  "rowFilter.comments_with_author_votes.updatedAt": string;
  "rowFilter.comments_with_author_votes.title": string;
  "rowFilter.comments_with_author_votes.content": string;
  "rowFilter.comments_with_author_votes.isPublished": string;
  "rowFilter.comments_with_author_votes.authorId": string;
  "rowFilter.comments_with_author_votes.parentId": string;
  "rowFilter.comments_with_author_votes.live": string;
  "rowFilter.comments_with_author_votes.siteId": string;
  "rowFilter.comments_with_author_votes.isPinned": string;
  "rowFilter.comments_with_author_votes.isDeleted": string;
  "rowFilter.comments_with_author_votes.isApproved": string;
  "rowFilter.comments_with_author_votes.author": string;
  "rowFilter.comments_with_author_votes.votes": string;
  "rowFilter.comments_with_author_votes.upvotes": string;
  "rowFilter.comments_with_author_votes.downvotes": string;
  /** posts */
  "body.posts": definitions["posts"];
  "rowFilter.posts.id": string;
  "rowFilter.posts.slug": string;
  "rowFilter.posts.createdAt": string;
  "rowFilter.posts.updatedAt": string;
  "rowFilter.posts.title": string;
  "rowFilter.posts.content": string;
  "rowFilter.posts.isPublished": string;
  "rowFilter.posts.authorId": string;
  "rowFilter.posts.parentId": string;
  "rowFilter.posts.live": string;
  "rowFilter.posts.siteId": string;
  "rowFilter.posts.isPinned": string;
  "rowFilter.posts.isDeleted": string;
  "rowFilter.posts.isApproved": string;
  /** profiles */
  "body.profiles": definitions["profiles"];
  "rowFilter.profiles.id": string;
  "rowFilter.profiles.updated_at": string;
  "rowFilter.profiles.username": string;
  "rowFilter.profiles.avatar_url": string;
  "rowFilter.profiles.website": string;
  "rowFilter.profiles.user_metadata": string;
  "rowFilter.profiles.full_name": string;
  /** sites */
  "body.sites": definitions["sites"];
  "rowFilter.sites.id": string;
  "rowFilter.sites.siteDomain": string;
  "rowFilter.sites.ownerId": string;
  "rowFilter.sites.name": string;
  /** votes */
  "body.votes": definitions["votes"];
  "rowFilter.votes.postId": string;
  "rowFilter.votes.userId": string;
  "rowFilter.votes.value": string;
}

export interface operations {}
