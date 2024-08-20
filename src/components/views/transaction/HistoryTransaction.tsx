"use client";
import TitleHistory from "./TitleHistory";
import ContentHistory from "./ContentHistory";
import ContainerContent from "./ContainerContent";
import ContainerHistory from "./ContainerHistory";
import { Transaction } from "@prisma/client";
import { useTransaction } from "@/store/useTransaction";
import ContainerFeedback from "../cart/ContainerFeedback";
import { FaRegTrashAlt } from "react-icons/fa";

interface HistoryTransactionProps {
  data: Transaction[];
}

interface DataResult {
  date: Date;
  balance: number;
  data: Transaction[];
}

export default function HistoryTransaction(props: HistoryTransactionProps) {
  const { data } = props;
  const { transaction, message } = useTransaction();
  let result: DataResult[];
  let dateTransaction: Date[];

  if (transaction.length === 0) {
    if (message === "") {
      if (data.length === 0) {
        return (
          <ContainerFeedback>
            <FaRegTrashAlt className="text-darkGreen text-7xl" />
            <span className="text-lg font-semibold">
              Your Transaction is empty
            </span>
          </ContainerFeedback>
        );
      }
      dateTransaction = data
        .filter(
          (item, i, self) =>
            self.findIndex((t) => {
              const dateTransaction = new Date(t.createdAt);
              const dateItem = new Date(item.createdAt);
              const monthTransaction = dateTransaction.getMonth();
              const monthItem = dateItem.getMonth();
              return monthTransaction === monthItem;
            }) === i
        )
        .map((item) => item.createdAt);

      result = dateTransaction.map((item) => {
        const balance = data
          .filter((transaction) => {
            const dateTransaction = new Date(transaction.createdAt);
            const dateItem = new Date(item);
            const monthTransaction = dateTransaction.getMonth();
            const monthItem = dateItem.getMonth();
            return monthTransaction === monthItem;
          })
          .reduce((sum, transaction) => sum + transaction.balance, 0);
        return {
          date: item,
          balance,
          data: data.filter((transaction) => {
            const dateTransaction = new Date(transaction.createdAt);
            const dateItem = new Date(item);
            const monthTransaction = dateTransaction.getMonth();
            const monthItem = dateItem.getMonth();
            return monthTransaction === monthItem;
          }),
        };
      });
    } else {
      return (
        <div className="w-full min-h-[30vh] flex items-center justify-center">
          <h2 className="text-red-600 font-semibold text-2xl">{message}</h2>
        </div>
      );
    }
  } else {
    dateTransaction = transaction
      .filter(
        (item, i, self) =>
          self.findIndex((t) => {
            const dateTransaction = new Date(t.createdAt);
            const dateItem = new Date(item.createdAt);
            const monthTransaction = dateTransaction.getMonth();
            const monthItem = dateItem.getMonth();
            return monthTransaction === monthItem;
          }) === i
      )
      .map((item) => item.createdAt);

    result = dateTransaction.map((item) => {
      const balance = transaction
        .filter((transaction) => {
          const dateTransaction = new Date(transaction.createdAt);
          const dateItem = new Date(item);
          const monthTransaction = dateTransaction.getMonth();
          const monthItem = dateItem.getMonth();
          return monthTransaction === monthItem;
        })
        .reduce((sum, transaction) => sum + transaction.balance, 0);

      return {
        date: item,
        balance,
        data: transaction.filter((transaction) => {
          const dateTransaction = new Date(transaction.createdAt);
          const dateItem = new Date(item);
          const monthTransaction = dateTransaction.getMonth();
          const monthItem = dateItem.getMonth();
          return monthTransaction === monthItem;
        }),
      };
    });
  }

  return (
    <div className="flex flex-col gap-y-7 mt-5 px-2 mb-32">
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
