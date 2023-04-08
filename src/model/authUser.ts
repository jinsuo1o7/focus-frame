export type AuthUser = {
  email: string;
  image?: string;
  name: string;
  username: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
