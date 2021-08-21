import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../middleware/apiCallAction";

const comments = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    getData: (state, action) => {
      state.comments = action.payload;
    },
    saveComment: (state, action) => {
      state.comments.unshift(action.payload);
      toast.success("Comment saved successfully !", {
        position: "top-center",
      });
    },
    updatedComment: (state, action) => {
      state.comments.splice(
        state.comments.findIndex((i) => i.id === action.payload.id),
        1,
        action.payload
      );
      toast.success("Comment updated successfully !", {
        position: "top-center",
      });
    },
    removedComment: (state, action) => {
      state.comments = state.comments.filter((i) => i.id !== action.payload);
      console.log("removed");
      toast.success("Comment removed successfully !", {
        position: "top-center",
      });
    },
  },
});

export const getComments = () =>
  apiCall({
    url: "/comments",
    method: "GET",
    onSuccess: comments.actions.getData.type,
    onFail: comments.actions.getData.type,
  });

export const addComment = (data) =>
  apiCall({
    url: "/comments",
    method: "POST",
    data,
    onSuccess: comments.actions.saveComment.type,
    onFail: comments.actions.saveComment.type,
  });

export const editComment = (data) =>
  apiCall({
    url: "/comments/" + data.id,
    method: "PUT",
    data,
    onSuccess: comments.actions.updatedComment.type,
    onFail: comments.actions.updatedComment.type,
  });

export const delComment = (data) =>
  apiCall({
    url: "/comments/" + data,
    method: "DELETE",
    data,
    onSuccess: comments.actions.removedComment.type,
    onFail: comments.actions.removedComment.type,
  });

export default comments.reducer;
