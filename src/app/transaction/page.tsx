// @refresh reset
import Container from "@/components/Container";
import HistoryTransaction from "@/components/views/transaction/HistoryTransaction";
import Search from "@/components/views/transaction/Search";
import { ResponsePayload } from "@/models/user-model";
import { getCookie } from "@/utils/cookies";
import { toast } from "sonner";

export default async function TransactionPage() {
  const response = await fetch("http://localhost:3000/api/transaction", {
    method: "GET",
    headers: {
      bearir: getCookie("token")?.value || "",
    },
  });

  const data = (await response.json()) as ResponsePayload;
  if (data.status === "failed") {
    toast("Error", {
      description: data.message,
      duration: 2000,
    });
  }

  return (
    <Container>
      <Search />
      <HistoryTransaction data={data.data} />
    </Container>
  );
}
