import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts";
import users from "./users";
import { api } from "./middleware/api";

export default configureStore({
  reducer: { posts, users },
  middleware: [api],
});
