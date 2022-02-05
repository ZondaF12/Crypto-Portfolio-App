import { Modal, Button, Stack } from "react-bootstrap";
import { usePortfolio } from "../contexts/PortfolioContext";
import { currencyFormatter } from "../utils";

export default function ViewTransactionModal({ coinId, handleClose }) {
  const { getCoinTransaction, coins, deleteTransaction, deleteCoin } =
    usePortfolio();

  const transactions = getCoinTransaction(coinId);

  const coin = coins.find((c) => c.id === coinId);

  return (
    <Modal show={coinId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Transactions - {coin?.name}</div>
            <Button
              onClick={() => {
                deleteCoin(coin);
                handleClose();
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {transactions.map((transaction) => (
            <Stack direction="horizontal" gap="2" key={transaction.id}>
              <div className="me-auto fs-4">{transaction.amount}</div>
              <div className="fs-5">
                {currencyFormatter.format(transaction.price)}
              </div>
              <Button
                onClick={() => deleteTransaction(transaction)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

{
  /* <Form.Group className="mb-3" controlId="amount">
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
        </div> */
}
