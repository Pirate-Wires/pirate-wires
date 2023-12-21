export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface ViewedArticle {
  slug: string;
  viewed_at: string;
}

export interface Database {
  public: {
    Tables: {
      article_metering: {
        Row: {
          id: string;
          ip_address: string;
          viewed_articles: ViewedArticle[] | null;
        };
        Insert: {
          id?: string;
          ip_address: string;
          viewed_articles?: ViewedArticle[] | null;
        };
        Update: {
          id?: string;
          ip_address?: string;
          viewed_articles?: ViewedArticle[] | null;
        };
        Relationships: [];
      };
      otps: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          otp: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          otp?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          otp?: string | null;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          authorId: string;
          content: string | null;
          createdAt: string;
          id: number;
          isApproved: boolean;
          isDeleted: boolean;
          isPinned: boolean;
          isPublished: boolean;
          live: boolean | null;
          parentId: number | null;
          rootId: number | null;
          sanity_id: string | null;
          siteId: number;
          slug: string;
          title: string | null;
          updatedAt: string | null;
        };
        Insert: {
          authorId: string;
          content?: string | null;
          createdAt?: string;
          id?: number;
          isApproved?: boolean;
          isDeleted?: boolean;
          isPinned?: boolean;
          isPublished?: boolean;
          live?: boolean | null;
          parentId?: number | null;
          rootId?: number | null;
          sanity_id?: string | null;
          siteId?: number;
          slug: string;
          title?: string | null;
          updatedAt?: string | null;
        };
        Update: {
          authorId?: string;
          content?: string | null;
          createdAt?: string;
          id?: number;
          isApproved?: boolean;
          isDeleted?: boolean;
          isPinned?: boolean;
          isPublished?: boolean;
          live?: boolean | null;
          parentId?: number | null;
          rootId?: number | null;
          sanity_id?: string | null;
          siteId?: number;
          slug?: string;
          title?: string | null;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_authorId_fkey";
            columns: ["authorId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          subscription_id: string | null;
          updated_at: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          subscription_id?: string | null;
          updated_at?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          subscription_id?: string | null;
          updated_at?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_subscription_id_fkey";
            columns: ["subscription_id"];
            isOneToOne: false;
            referencedRelation: "subscriptions";
            referencedColumns: ["id"];
          },
        ];
      };
      sites: {
        Row: {
          id: number;
          name: string;
          ownerId: string;
          siteDomain: string;
        };
        Insert: {
          id?: number;
          name: string;
          ownerId: string;
          siteDomain: string;
        };
        Update: {
          id?: number;
          name?: string;
          ownerId?: string;
          siteDomain?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          comments_display_name: string | null;
          comments_notifications: boolean | null;
          billing_address: Json | null;
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          stripe_customer_id: string | null;
          subscription_id: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          comments_display_name: string | null;
          comments_notifications: boolean | null;
          billing_address?: Json | null;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          stripe_customer_id?: string | null;
          subscription_id?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          comments_display_name: string | null;
          comments_notifications: boolean | null;
          billing_address?: Json | null;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          stripe_customer_id?: string | null;
          subscription_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_subscription_id_fkey";
            columns: ["subscription_id"];
            isOneToOne: false;
            referencedRelation: "subscriptions";
            referencedColumns: ["id"];
          },
        ];
      };
      votes: {
        Row: {
          guestid: string | null;
          isactive: boolean | null;
          isguest: boolean | null;
          postId: number;
          userId: string;
          value: number;
        };
        Insert: {
          guestid?: string | null;
          isactive?: boolean | null;
          isguest?: boolean | null;
          postId: number;
          userId: string;
          value: number;
        };
        Update: {
          guestid?: string | null;
          isactive?: boolean | null;
          isguest?: boolean | null;
          postId?: number;
          userId?: string;
          value?: number;
        };
        Relationships: [
          {
            foreignKeyName: "votes_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "comment_with_author";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "comments_linear_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "comments_with_author_votes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_postId_fkey";
            columns: ["postId"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      comment_with_author: {
        Row: {
          author: Json | null;
          authorId: string | null;
          content: string | null;
          createdAt: string | null;
          id: number | null;
          isApproved: boolean | null;
          isDeleted: boolean | null;
          isPinned: boolean | null;
          isPublished: boolean | null;
          live: boolean | null;
          parentId: number | null;
          siteId: number | null;
          slug: string | null;
          title: string | null;
          updatedAt: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_authorId_fkey";
            columns: ["authorId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      comments_linear_view: {
        Row: {
          author: Json | null;
          authorId: string | null;
          content: string | null;
          createdAt: string | null;
          id: number | null;
          isApproved: boolean | null;
          isDeleted: boolean | null;
          isPinned: boolean | null;
          isPublished: boolean | null;
          live: boolean | null;
          parent: Json | null;
          parentId: number | null;
          responses: Json | null;
          siteId: number | null;
          slug: string | null;
          title: string | null;
          updatedAt: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_authorId_fkey";
            columns: ["authorId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      comments_thread: {
        Row: {
          author: Json | null;
          authorId: string | null;
          content: string | null;
          createdAt: string | null;
          depth: number | null;
          downvotes: number | null;
          id: number | null;
          isApproved: boolean | null;
          isDeleted: boolean | null;
          isPinned: boolean | null;
          isPublished: boolean | null;
          live: boolean | null;
          parentId: number | null;
          path: number[] | null;
          pathLeastRecent: number[] | null;
          pathMostRecent: number[] | null;
          pathVotesRecent: number[] | null;
          siteId: number | null;
          slug: string | null;
          title: string | null;
          updatedAt: string | null;
          upvotes: number | null;
          votes: number | null;
        };
        Relationships: [];
      };
      comments_thread_with_user_vote: {
        Row: {
          author: Json | null;
          authorId: string | null;
          content: string | null;
          createdAt: string | null;
          depth: number | null;
          downvotes: number | null;
          id: number | null;
          isApproved: boolean | null;
          isDeleted: boolean | null;
          isPinned: boolean | null;
          isPublished: boolean | null;
          live: boolean | null;
          parentId: number | null;
          path: number[] | null;
          pathLeastRecent: number[] | null;
          pathMostRecent: number[] | null;
          pathVotesRecent: number[] | null;
          siteId: number | null;
          slug: string | null;
          title: string | null;
          updatedAt: string | null;
          upvotes: number | null;
          userVoteValue: number | null;
          votes: number | null;
        };
        Relationships: [];
      };
      comments_with_author_votes: {
        Row: {
          author: Json | null;
          authorId: string | null;
          content: string | null;
          createdAt: string | null;
          downvotes: number | null;
          id: number | null;
          isApproved: boolean | null;
          isDeleted: boolean | null;
          isPinned: boolean | null;
          isPublished: boolean | null;
          live: boolean | null;
          parentId: number | null;
          siteId: number | null;
          slug: string | null;
          title: string | null;
          updatedAt: string | null;
          upvotes: number | null;
          votes: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_authorId_fkey";
            columns: ["authorId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
