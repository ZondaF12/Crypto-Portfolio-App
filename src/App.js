import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddCoinModal from "./components/AddCoinModal";
import AddTransactionModal from "./components/AddTransactionModal";
import ViewTransactionModal from "./components/ViewTransactionModal";
import PortfolioCard from "./components/PortfolioCard";
import { usePortfolio } from "./contexts/PortfolioContext";

function App() {
  const [showAddCoinModal, setShowAddCoinModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [viewTransactionModalCoinId, setViewTransactionModalCoinId] =
    useState();
  const [addTransactionModalCoinId, setAddTransactionModalCoinId] = useState();
  const { coins, getCoinTransaction } = usePortfolio();

  function openAddTransactionModal(coinId) {
    setShowAddTransactionModal(true);
    setAddTransactionModalCoinId(coinId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">My Portfolio</h1>
          <Button variant="primary" onClick={() => setShowAddCoinModal(true)}>
            Add New
          </Button>
          <Button variant="secondary">More</Button>
        </Stack>
        <div className="d-flex justify-content-between align-items-center fw-normal mb-0 p-3">
          <h5>Coin</h5>
          <h5>Price</h5>
          <h5>Holdings</h5>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1rf))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {coins.map((coin) => {
            const holdings = getCoinTransaction(coin.id).reduce(
              (total, transaction) => total + transaction.amount,
              0
            );

            return (
              <PortfolioCard
                key={coin.id}
                name={coin.name}
                amount={200}
                change={12.94}
                holdingsPrice={800}
                holdingsTotal={holdings}
                openAddTransactionClick={() => openAddTransactionModal(coin.id)}
                onViewTransactionClick={() =>
                  setViewTransactionModalCoinId(coin.id)
                }
              />
            );
          })}
        </div>
      </Container>
      <AddCoinModal
        show={showAddCoinModal}
        handleClose={() => setShowAddCoinModal(false)}
      />
      <AddTransactionModal
        show={showAddTransactionModal}
        defaultCoinId={addTransactionModalCoinId}
        handleClose={() => setShowAddTransactionModal(false)}
      />
      <ViewTransactionModal
        coinId={viewTransactionModalCoinId}
        handleClose={() => setViewTransactionModalCoinId()}
      />
    </>
  );
}

export default App;
