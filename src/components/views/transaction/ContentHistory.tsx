import Image from "next/image";

interface ContentHistoryProps {
  src: string;
  title: string;
  date: string;
  time: string;
  balance: number;
}

export default function ContentHistory(props: ContentHistoryProps) {
  const { src, title, date, time, balance } = props;
  const balancePrice = balance.toLocaleString();

  return (
    <div className="flex justify-between items-center mb-2 border-b border-lightGrey/50 pb-3 last:pb-0 last:border-none">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <div className="p-2 bg-lightGrey/10 border-lightGrey/60 border rounded-[5px]">
            <Image src={src} width={41} height={41} alt={"Coffe"} />
          </div>
          <div className="flex flex-col justify-center -mt-1 ">
            <h5 className="text-dark font-medium text-base">{title}</h5>
            <span className="text-darkGrey font-medium text-sm">
              {date} - {time}
            </span>
          </div>
        </div>
      </div>
      <span className="text-dark font-medium text-base">
        {balancePrice.includes("-")
          ? `-Rp ${balancePrice.split("-")[1]}`
          : `Rp ${balancePrice}`}
      </span>
    </div>
  );
}
