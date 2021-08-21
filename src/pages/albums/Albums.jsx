import React from "react";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { connect } from "react-redux";
import {
  getAlbums,
  addAlbum,
  editAlbum,
  delAlbum,
} from "../../store/reducers/albums";
import AlbumModal from "./AlbumModal";

function Albums({ albums, getAlbums, addAlbum, editAlbum, delAlbum }) {
  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function onSubmit(event, errors, values) {
    if (currentItem) {
      editAlbum({ ...values, id: currentItem.id });
    } else {
      addAlbum(values);
    }
    toggle();
  }

  function toggle() {
    setModal(!modal);
    setCurrentItem(null);
  }

  function hadleEdit(item) {
    setCurrentItem(item);
    setModal(true)
  }

  return (
    <div className="row">
      <div className="col">
        <h2>Albums</h2>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {albums.map((item) => (
              <tr key={item.title}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  <button
                    onClick={() => hadleEdit(item)}
                    className="btn btn-outline-success"
                  >
                    <Icon.PencilFill />
                  </button>{" "}
                  <button
                    onClick={() => delAlbum(item.id)}
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
      <AlbumModal
        modal={modal}
        toggle={toggle}
        currentItem={currentItem}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default connect(({ albums: { albums } }) => ({ albums }), {
  getAlbums,
  addAlbum,
  editAlbum,
  delAlbum,
})(Albums);
