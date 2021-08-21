import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import TodoModal from "./TodoModal";
import * as Icon from "react-bootstrap-icons";

import {
  getTodos,
  addTodos,
  editTodos,
  delTodos,
  handleCheck
} from "../../store/reducers/todos";

function Todos({ todos, getTodos, addTodos, editTodos, delTodos, handleCheck }) {
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function toggle() {
    setModal(!modal);
    setCurrentItem(null);
  }

  function onSubmit(event, errors, values) {
    if (currentItem) {
      editTodos({ ...values, id: currentItem.id });
    } else {
      addTodos(values);
    }
    toggle();
  }

  function hadleEdit(item) {
    setCurrentItem(item);
    setModal(true);
  }

  return (
    <div className="row">
      <div className="col">
        <h2>Todos</h2>
      </div>
      <div className="col-md-2">
        <button onClick={toggle} className="btn btn-secondary w-100">
          +Add
        </button>
      </div>
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Complated</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    className="form-check-input"
                    onChange={()=>handleCheck(item.id)}
                  />
                </td>
                <td>{item.title}</td>
                <td>
                  <button
                    onClick={() => hadleEdit(item)}
                    className="btn btn-outline-success"
                  >
                    <Icon.PencilFill />
                  </button>{" "}
                  <button
                    onClick={() => delTodos(item.id)}
                    className="btn btn-outline-danger "
                  >
                    <Icon.XLg />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TodoModal
        modal={modal}
        toggle={toggle}
        currentItem={currentItem}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default connect(({ todos: { todos } }) => ({ todos }), {
  getTodos,
  addTodos,
  editTodos,
  delTodos,
  handleCheck
})(Todos);
