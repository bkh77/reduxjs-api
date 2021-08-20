import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

function PostModal({ modal, toggle, onSubmit, currentItem }) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Add post</ModalHeader>
      <ModalBody>
        <AvForm
          id="postForm"
          onSubmit={onSubmit}
          model={currentItem }
        >
          <AvField name="title" label="Title" required />
          <AvField name="body" label="Body" required />
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

export default PostModal;
