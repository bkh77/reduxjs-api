import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../middleware/apiCallAction";

const posts = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    getData: (state, action) => {
      state.posts = action.payload;
    },
    savePost: (state, action) => {
      state.posts.unshift(action.payload);
      toast.success("Post added successfully !", {
        position: "top-center",
      });
    },
    updatedPost: (state, action) => {
      state.posts.splice(
        state.posts.findIndex((i) => i.id === action.payload.id),
        1,
        action.payload
      );
      toast.success("Post updated successfully !", {
        position: "top-center",
      });
    },
    removedPost: (state, action) => {
      state.posts = state.posts.filter((i) => i.id !== action.payload);
      console.log("removed");
    },
  },
});

export const getPosts = () =>
  apiCall({
    url: "posts",
    method: "GET",
    onSuccess: posts.actions.getData.type,
    onFail: posts.actions.getData.type,
  });

export const addPost = (data) =>
  apiCall({
    url: "/posts",
    method: "POST",
    data,
    onSuccess: posts.actions.savePost.type,
    onFail: posts.actions.savePost.type,
  });

export const editPost = (data) =>
  apiCall({
    url: "/posts/" + data.id,
    method: "PUT",
    data,
    onSuccess: posts.actions.updatedPost.type,
    onFail: posts.actions.updatedPost.type,
  });

export const deletePost = (data) =>
  apiCall({
    url: "/posts/" + data,
    method: "DELETE",
    data,
    onSuccess: posts.actions.removedPost.type,
    onFail: posts.actions.removedPost.type,
  });

export default posts.reducer;
