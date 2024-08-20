import TitleHistory from "./TitleHistory";
import ContentHistory from "./ContentHistory";
import ContainerContent from "./ContainerContent";
import ContainerHistory from "./ContainerHistory";
import { Transaction } from "@prisma/client";

interface HistoryTransactionProps {
  data: Transaction[];
}

export default function HistoryTransaction(
  props: HistoryTransactionProps
) {
  const { data } = props;
  const dateTransaction = data
    .filter(
      (item, i, self) =>
        self.findIndex((t) => t.createdAt === item.createdAt) === i
    )
    .map((item) => item.createdAt);

  const result = dateTransaction.map((item) => {
    const balance = data
      .filter((transaction) => transaction.createdAt === item)
      .reduce((sum, transaction) => sum + transaction.balance, 0);
    return {
      date: item,
      balance,
      data: data.filter((transaction) => {
        return transaction.createdAt === item;
      }),
    };
  });

  return (
    <div className="flex flex-col gap-y-7 mt-5 px-2">
      {result.map((item) => {
        const monthNow = new Date().toLocaleString("id-ID", { month: "long" });
        const transactionMonth = new Date(item.date).toLocaleString("id-ID", {
          month: "long",
        });

        return (
          <ContainerHistory key={item.date.toString()}>
            <TitleHistory
              month={
                transactionMonth === monthNow ? "This Month" : transactionMonth
              }
              balance={item.balance}
            />
            <ContainerContent>
              {item.data.map((item) => (
                <ContentHistory
                  idCoffe={item.idCoffe}
                  key={item.id}
                  title={item.title}
                  date={item.createdAt}
                  balance={item.balance}
                />
              ))}
            </ContainerContent>
          </ContainerHistory>
        );
      })}
    </div>
  );
}
