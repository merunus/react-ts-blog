import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { Paths } from "../models/paths";
import {
  AllPosts,
  CreatePost,
  FullPost,
  Login,
  MyPosts,
  Register,
} from "../pages";
import SharedLayout from "../pages/SharedLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={Paths.Home}
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MyPosts />} />
        <Route path={Paths.AllPosts} element={<AllPosts />} />
        <Route path={Paths.CreatePost} element={<CreatePost />} />
        <Route path={`${Paths.EditPost}/:postId`} element={<CreatePost />} />
        <Route path={`${Paths.FullPost}/:postId`} element={<FullPost />} />
      </Route>
      <Route path={Paths.Register} element={<Register />} />
      <Route path={Paths.Login} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
