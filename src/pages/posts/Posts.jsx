import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { connect } from "react-redux";
import { getPosts, addPost, editPost, deletePost} from "../../store/reducers/posts";
import PostModal from "./PostModal";

function Posts({ posts, getPosts, addPost, editPost, deletePost }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function toggle() {
    setModal((p) => !p);
    setCurrentItem(null);
  }

  function onSubmit(event, errors, values) {
    if (currentItem) {
      editPost({ ...values, id: currentItem.id });
    } else {
      addPost(values);
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
        <h2>Posts</h2>
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
              <th>Title</th>
              <th>Body</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                  <button
                    onClick={() => hadleEdit(item)}
                    className="btn btn-outline-success "
                  >
                    <Icon.PencilFill />
                  </button>{" "}
                  <button
                  onClick={()=>deletePost(item.id)} className="btn btn-outline-danger ">
                    <Icon.XLg />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PostModal
        modal={modal}
        toggle={toggle}
        onSubmit={onSubmit}
        currentItem={currentItem}
      />
    </div>
  );
}

export default connect(({ posts: { posts } }) => ({ posts }), {
  getPosts,
  addPost,
  editPost,
  deletePost
})(Posts);
