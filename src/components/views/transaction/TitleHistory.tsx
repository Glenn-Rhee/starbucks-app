interface TitleHistoryProps {
  month: string;
  balance: number;
}

export default function TitleHistory(props: TitleHistoryProps) {
  const { month, balance } = props;
  const balancePrice = balance.toLocaleString();

  return (
    <div className="flex justify-between items-center">
      <h4 className="text-dark text-base font-semibold">{month}</h4>
      <span className="text-base font-medium text-mainGreen">
        {balancePrice.includes("-")
          ? `-Rp ${balancePrice.split("-")[1]}`
          : `Rp ${balancePrice}`}
      </span>
    </div>
  );
}
