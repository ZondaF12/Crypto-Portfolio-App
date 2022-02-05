import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { usePortfolio } from "../contexts/PortfolioContext";

export default function AddCoinModal({ show, handleClose }) {
  const nameRef = useRef();
  const { addCoin } = usePortfolio();

  function handleSubmit(e) {
    e.preventDefault();
    addCoin({
      name: nameRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Coin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
