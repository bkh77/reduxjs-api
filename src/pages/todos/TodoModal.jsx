import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

function TodoModal({ modal, toggle, onSubmit, currentItem }) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Add todos</ModalHeader>
      <ModalBody>
        <AvForm
          id="postForm"
          onSubmit={onSubmit}
          model={currentItem }
        >
          <AvField name="title" label="Title" required />
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

export default TodoModal;
