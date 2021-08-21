import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall } from "../middleware/apiCallAction";

const todos = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    getData: (state, action) => {
      state.todos = action.payload;
    },
    savedTodo: (state, action) => {
      state.todos.unshift(action.payload);
      toast.success("Todos saved succesfully !", {
        position: "top-center",
      });
    },
    updatedTodos: (state, action) => {
      state.todos.splice(
        state.todos.findIndex((i) => i.id === action.payload.id),
        1,
        action.payload
      );
      toast.success("Todos updated succesfully !", {
        position: "top-center",
      });
    },
    removedTodos: (state, action) => {
      state.payload = state.todos.filter((i) => i.id !== action.payload);
      toast.success("Todos removed succesfully !", {
        position: "top-center",
      });
    },
    handleCheck: (state, action) => {
      state.todos.forEach((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
      });
    },
  },
});

export const getTodos = () =>
  apiCall({
    url: "/todos",
    method: "GET",
    onSuccess: todos.actions.getData.type,
    onFail: todos.actions.getData.type,
  });

export const addTodos = (data) =>
  apiCall({
    url: "/todos",
    method: "POST",
    data,
    onSuccess: todos.actions.savedTodo.type,
    onFail: todos.actions.savedTodo.type,
  });

export const editTodos = (data) =>
  apiCall({
    url: "/todos/" + data.id,
    method: "PUT",
    data,
    onSuccess: todos.actions.updatedTodos.type,
    onFail: todos.actions.updatedTodos.type,
  });

export const delTodos = (data) =>
  apiCall({
    url: "/todos/" + data,
    method: "DELETE",
    data,
    onSuccess: todos.actions.removedTodos.type,
    onFail: todos.actions.removedTodos.type,
  });

export const handleCheck = (data) =>
  apiCall({
    url: "/todos/" + data,
    method: "PATCH",
    data,
    onSuccess: todos.actions.handleCheck.type,
    onFail: todos.actions.handleCheck.type,
  });

export default todos.reducer;
