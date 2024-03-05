import { Button, Modal } from "flowbite-react";

function HelperModal({ openModal, setOpenModal }) {
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
          <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
            Seller contact details have been sent to your email address
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="success" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default HelperModal;
