import { client } from "@/service/sanity";
import { ProfileUser, SearchUser } from "@/model/authUser";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};
export async function addUser({ id, email, name, username, image }: OAuthUser) {
  return client
    .createIfNotExists({
      _id: id,
      _type: "user",
      email,
      name,
      username,
      image,
      following: [],
      followers: [],
      bookmarks: [],
    })
    .catch(console.error);
}

export async function getUserByUsername(username: string) {
  return client.fetch(`
  *[_type == "user" && username == "${username}"][0]{
  ...,
  "id":_id,
  following[]->{username, image},
  followers[]->{username, image},
  "bookmarks":bookmarks[]->_id
  }`);
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}*") || (username match "${keyword}*")`
    : "";

  return client
    .fetch(
      `*[_type == "user" ${query}]{
        ...,
        "following": count(following),  
        "followers": count(followers),  
        }
        `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserProfile(username: string) {
  return client
    .fetch(
      `
    *[_type == "user" && username == "${username}"][0]{
        ...,
        "id": _id,
        "following": count(following),  
        "followers": count(followers),  
        "posts": count(*[_type == "post" && author->username == "${username}"])
    }
    `
    )
    .then((user: ProfileUser) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(postId: string, userId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(postId: string, userId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit();
}
