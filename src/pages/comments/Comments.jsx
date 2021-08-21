import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { connect } from "react-redux";
import {
  getComments,
  addComment,
  editComment,
  delComment,
} from "../../store/reducers/comments";
import CommentModal from "./CommentModal";

function Comments({
  comments,
  delComment,
  getComments,
  addComment,
  editComment,
}) {
  useEffect(() => {
    getComments();
  }, [getComments]);

  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function toggle() {
    setModal(!modal);
    setCurrentItem(null);
  }

  function onSubmit(event, errors, values) {
    if (currentItem) {
      editComment({ ...values, id: currentItem.id });
    } else {
      addComment(values);
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
        <h2>Comments</h2>
      </div>
      <div className="col-md-2">
        <button onClick={toggle} className="btn btn-secondary w-100">
          +Add
        </button>
      </div>
      <div className="com-md-12">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
                <td>
                  <button
                    onClick={() => hadleEdit(item)}
                    className="btn btn-outline-success"
                  >
                    <Icon.PencilFill />
                  </button>
                  <button
                    onClick={() => delComment(item.id)}
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
      <CommentModal
        modal={modal}
        toggle={toggle}
        onSubmit={onSubmit}
        currentItem={currentItem}
      />
    </div>
  );
}

export default connect(({ comments: { comments } }) => ({ comments }), {
  getComments,
  addComment,
  editComment,
  delComment,
})(Comments);
