import React from "react";
import { Button, Modal } from "flowbite-react";
import { MdDoneOutline } from "react-icons/md";

const EmailSentModal = ({ openModal, setOpenModal }) => {
  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      popup
      dismissible
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <MdDoneOutline className="mx-auto mb-4 h-14 w-14 text-blue-600 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            The password reset link has been sent to your email address
          </h3>
          <div className="flex justify-center">
            <Button color="success" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EmailSentModal;
