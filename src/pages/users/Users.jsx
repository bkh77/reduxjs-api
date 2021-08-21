import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers, addUser, editUser,deleteUser } from "../../store/reducers/users";
import UserModal from "./UserModal";
import * as Icon from "react-bootstrap-icons";

function Users({ users, getUsers, addUser, deleteUser, editUser }) {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  function toggle() {
    setModal(!modal);
    setCurrentItem(null);
  }

  function onSubmit(event, errors, values) {
    const obj = {
      ...values,
      address: {
        street: values.address,
      },
      company: {
        name: values.company,
      },
    };
    if (currentItem) {
      editUser({ ...obj, id: currentItem.id });
    } else {
      addUser(obj);
    }
    toggle();
  }

  function hadleEdit(item) {
    setModal(true);
    setCurrentItem({
      ...item,
      company: item.company.name,
      address: item.address.street,
    });
  }

  return (
    <div className="row">
      <div className="col">
        <h2>Users</h2>
      </div>
      <div className="col-md-2">
        <button onClick={toggle} className="btn btn-secondary w-100">
          +Add
        </button>
      </div>
      <div className="col-md-12 mt-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
                <td>{item.phone}</td>
                <td>
                  {" "}
                  <a
                    href={"https://" + item.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.website}
                  </a>{" "}
                </td>
                <td>{item.company.name}</td>
                <td>
                  <button
                    onClick={() => hadleEdit(item)}
                    className="btn btn-outline-success"
                  >
                    <Icon.PencilFill />
                  </button>
                  <button
                    onClick={() => deleteUser(item.id)}
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
      <UserModal
        modal={modal}
        toggle={toggle}
        onSubmit={onSubmit}
        currentItem={currentItem}
      />
    </div>
  );
}

export default connect(({ users: { users } }) => ({ users }), {
  getUsers,
  addUser,
  editUser,
  deleteUser
})(Users);
