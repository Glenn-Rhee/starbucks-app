import { cn } from "@/lib/utils";

interface TitleHistoryProps {
  month: string;
  balance: number;
}

export default function TitleHistory(props: TitleHistoryProps) {
  const { month, balance } = props;
  const balancePrice = balance.toLocaleString("id-ID");

  return (
    <div className="flex justify-between items-center">
      <h4 className="text-dark text-base font-semibold">{month}</h4>
      <span
        className={cn("text-base font-medium", {
          "text-mainGreen": balance > 0,
          "text-red-600": balance < 0,
        })}
      >
        Rp {balancePrice}
      </span>
    </div>
  );
}
