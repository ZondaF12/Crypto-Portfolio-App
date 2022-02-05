import { Button, Card, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function CoinCard({
  name,
  amount,
  change,
  holdingsPrice,
  holdingsTotal,
  openAddTransactionClick,
  onViewTransactionClick,
}) {
  const classNames = [];
  if (change < 0) {
    classNames.push("text-danger", "fs-6");
  } else {
    classNames.push("text-success", "fs-6");
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center fw-normal mb-0">
          <div className="justify-content-center">
            <img src="../eth-logo.png" height="32" alt="" />
            {name}
          </div>
          <div className="flex-row">
            {currencyFormatter.format(amount)}
            <div className={classNames.join(" ")}>{change}%</div>
          </div>
          <div className="flex-row">
            {currencyFormatter.format(holdingsPrice)}
            <div className="text-muted fs-6">{holdingsTotal}</div>
          </div>
        </Card.Title>
        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button
            variant="outline-primary"
            className="ms-auto"
            onClick={openAddTransactionClick}
          >
            Add Transaction
          </Button>
          <Button onClick={onViewTransactionClick} variant="outline-secondary">
            View Transactions
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

function percentageColour(change) {
  const percentage = change;
  let changeColour;

  if (change < 0) changeColour = "red";
  else changeColour = "green";
}
