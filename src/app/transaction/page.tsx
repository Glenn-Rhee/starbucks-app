// @refresh reset
import Container from "@/components/Container";
import HistoryTransaction from "@/components/views/transaction/HistoryTransaction";
import Search from "@/components/views/transaction/Search";

export default function TransactionPage() {
  return (
    <Container>
      <Search />
      <HistoryTransaction />
    </Container>
  );
}
