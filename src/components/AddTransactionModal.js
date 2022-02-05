import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { usePortfolio } from "../contexts/PortfolioContext";

export default function AddTransactionModal({
  show,
  handleClose,
  defaultCoinId,
}) {
  const amountRef = useRef();
  const priceRef = useRef();
  const coinIdRef = useRef();
  const { addTransaction, coins } = usePortfolio();

  function handleSubmit(e) {
    e.preventDefault();
    addTransaction({
      amount: parseFloat(amountRef.current.value),
      price: parseFloat(priceRef.current.value),
      coinId: coinIdRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="text" required min={0} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              ref={priceRef}
              type="text"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="coinId">
            <Form.Label>Coin</Form.Label>
            <Form.Select defaultValue={defaultCoinId} ref={coinIdRef}>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </Form.Select>
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
