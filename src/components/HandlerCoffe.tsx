"use client";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface HandlerCoffeProps {
  className?: string;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HandlerCoffe(props: HandlerCoffeProps) {
  const { setActive } = props;
  const [qty, setQty] = useState<number>(1);

  return (
    <>
      <div className="flex justify-around items-center flex-1 text-dark bg-lightGrey rounded-[4px]">
        <button
          className="px-1"
          onClick={() => (qty < 2 ? null : setQty(qty - 1))}
        >
          -
        </button>
        <span className="text-sm">{qty}</span>
        <button className="px-1" onClick={() => setQty(qty + 1)}>
          +
        </button>
      </div>
      <button
        type="button"
        className="bg-mainGreen p-1 rounded-[5px]"
        onClick={() => setActive(false)}
      >
        <IoMdCheckmark className="text-white" />
      </button>
    </>
  );
}
