import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../middleware/apiCallAction";

const albums = createSlice({
  name: "albums",
  initialState: {
    albums: [],
  },
  reducers: {
    getData: (state, action) => {
      state.albums = action.payload;
    },
    savedAlbum: (state, action) => {
      state.albums.unshift(action.payload);
      toast.success("Album saved successfully !", {
        position: "top-center",
      });
    },
    updatedAlbum: (state, action) => {
      state.albums.splice(
        state.albums.findIndex((i) => i.id === action.payload.id),
        1,
        action.payload
      );
      toast.success("Album updated successfully !", {
        position: "top-center",
      });
    },
    removeAlbum: (state, action) => {
      state.albums = state.albums.filter((i) => i.id !== action.payload);
      toast.success("Album removed successfully !", {
        position: "top-center",
      });
    },
  },
});

export const getAlbums = () =>
  apiCall({
    url: "/albums",
    method: "GET",
    onSuccess: albums.actions.getData.type,
    onFail: albums.actions.getData.type,
  });

export const addAlbum = (data) =>
  apiCall({
    url: "/albums",
    method: "POST",
    data,
    onSuccess: albums.actions.savedAlbum.type,
    onFail: albums.actions.savedAlbum.type,
  });

export const editAlbum = (data) =>
  apiCall({
    url: "/albums/" + data.id,
    method: "PATCH",
    data,
    onSuccess: albums.actions.updatedAlbum.type,
    onFail: albums.actions.updatedAlbum.type,
  });

export const delAlbum = (data) =>
  apiCall({
    url: "/albums/" + data,
    method: "DELETE",
    data,
    onSuccess: albums.actions.removeAlbum.type,
    onFail: albums.actions.removeAlbum.type,
  });

export default albums.reducer;
