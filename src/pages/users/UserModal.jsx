import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

function UserModal({ modal, toggle, onSubmit, currentItem,  }) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Add post</ModalHeader>
      <ModalBody>
        <AvForm id="postForm" onSubmit={onSubmit} model={currentItem}>
          <AvField name="name" label="Name" required />
          <AvField name="email" label="Email" required />
          <AvField name="address" label="Address" required />
          <AvField name="phone" label="Phone" required />
          <AvField name="website" label="Website" required />
          <AvField name="company" label="Company" required />
        </AvForm>
      </ModalBody>
      <ModalFooter>
        <button onClick={toggle} className="btn btn-secondary">
          Cancel
        </button>
        <button form="postForm" className="btn btn-primary">
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default UserModal;
