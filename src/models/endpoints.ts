export const api = {
  BaseURL: process.env.REACT_APP_API_URL,
  MainURL: process.env.REACT_APP_MAIN_URL,
};

export enum Endpoints {
  Register = "/users",
  Login = "/auth",
  Token = "/auth",
  UserByToken = "/auth/user",
  UserById = "/users/",
  Users = "/users?limit=10000",
  Update = "/users/",
  UpdateAvatar = "/users/upload/",
  CreatePost = "/posts",
  MyPosts = "/posts?postedBy=",
  AllPosts = "/posts",
  SinglePost = "/posts/",
  DeletePost = "/posts/",
  EditPost = "/posts/",
  LikePost = "/posts/like/",
  UploadPostImage = "/posts/upload/",
  CreateComment = "/comments/post/",
  Comments = "/comments/post/",
  DeleteComment = "/comments/",
  EditComment = "/comments/",
  LikeComment = "/comments/like/",
}
