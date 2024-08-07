import { cn } from "@/lib/utils";

interface TransactionProps {
  icon: React.ComponentType;
  label: string;
  balance: number;
  className?: string;
}

export default function Transaction(props: TransactionProps) {
  const { label, balance, className } = props;

  return (
    <div className={cn("flex justify-start bg-ed-900 min-w-[50%]", className)}>
      <div className="flex gap-x-4 items-center">
        <div
          className={cn(
            "flex justify-center rounded-full text-white bg-green-600 p-2 items-center",
            label === "Income" ? "bg-green-600" : "bg-orange-600"
          )}
        >
          <props.icon />
        </div>
        <div className="flex flex-col text-dark">
          <span className="font-light text-xs tracking-widest">{label}</span>
          <span className="text-sm font-semibold">
            Rp {balance.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
