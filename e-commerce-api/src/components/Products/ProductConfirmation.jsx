import React from "react"; // Import React to use JSX syntax
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from react-bootstrap

// ConfirmationModal component receives three props:
// - show: a boolean to control the visibility of the modal
// - onConfirm: a function that will be called when the user confirms the action
// - onCancel: a function that will be called when the user cancels the action
function ConfirmationModal({ show, onConfirm, onCancel }) {
  return (
    // Modal component from react-bootstrap which shows a dialog box
    <Modal show={show} onHide={onCancel}>
      {/* Modal.Header defines the header section of the modal */}
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title> {/* Title of the modal */}
      </Modal.Header>
      
      {/* Modal.Body defines the content of the modal */}
      <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
      
      {/* Modal.Footer contains the action buttons at the bottom of the modal */}
      <Modal.Footer>
        {/* Button to cancel the action and close the modal */}
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        {/* Button to confirm the action and trigger the onConfirm function */}
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal; // Export the component so it can be used in other parts of the application
