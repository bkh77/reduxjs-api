import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../middleware/apiCallAction";

const users = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getData: (state, action) => {
      state.users = action.payload;
    },
    savedUser: (state, action) => {
      state.users.unshift(action.payload);
      toast.success("User saved successfully !", {
        position: "top-center",
      });
    },
    updateUser: (state, action) => {
      state.users.splice(
        state.users.findIndex((i) => i.id === action.payload.id),
        1,
        action.payload
      );
      toast.success("User updated successfully !", {
        position: "top-center",
      });
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((i) => i.id !== action.payload);
      console.log("removed");
      toast.warning("User removed successfully !", {
        position: "top-center",
      });
    },
  },
});

export const getUsers = () =>
  apiCall({
    url: "/users",
    method: "GET",
    onSuccess: users.actions.getData.type,
    onFail: users.actions.getData.type,
  });

export const addUser = (data) =>
  apiCall({
    url: "/users",
    method: "POST",
    data,
    onSuccess: users.actions.savedUser.type,
    onFail: users.actions.savedUser.type,
  });

export const editUser = (data) =>
  apiCall({
    url: "/users/" + data.id,
    method: "PUT",
    data,
    onSuccess: users.actions.updateUser.type,
    onFail: users.actions.updateUser.type,
  });

export const deleteUser = (data) =>
  apiCall({
    url: "/users/" + data,
    method: "DELETE",
    data,
    onSuccess: users.actions.removeUser.type,
    onFail: users.actions.removeUser.type,
  });

export default users.reducer;
