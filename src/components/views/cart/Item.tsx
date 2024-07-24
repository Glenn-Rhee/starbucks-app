interface ItemProps {
  qty: number;
  title: string;
  size: string;
  price: number;
}

export default function Item(props: ItemProps) {
  const { qty, title, size, price } = props;

  return (
    <div className="flex justify-between mt-5">
      <div className="flex gap-x-3">
        <div className="border-darkGrey/20 h-fit w-fit border p-2 rounded-[5px] flex items-center justify-center text-mainGreen">
          <span className="text-xs">{qty}x</span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-[2px]">
            <span className="font-bold text-dark text-sm">{title}</span>
            <p className="text-darkGrey font-light text-xs">{size}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <button className="text-xs font-bold text-mainGreen h-fit w-fit">
              Edit
            </button>
            <button className="text-xs font-bold text-red-600 h-fit w-fit">
              Delete
            </button>
          </div>
        </div>
      </div>
      <span className="text-xs text-darkGrey font-light">
        Rp {price.toLocaleString("id-ID")}
      </span>
    </div>
  );
}
