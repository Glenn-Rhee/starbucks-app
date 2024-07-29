import { cn } from "@/lib/utils";
import Image from "next/image";

interface SizeCoffeProps {
  className?: string;
  src: string;
  size: number;
  title: string;
}

export default function SizeCoffe(props: SizeCoffeProps) {
  const { className, src, size, title } = props;

  return (
    <div
      className={cn(
        "border-darkGrey/20 h-fit w-fit border min-w-[18px] box-border p-2 rounded-[5px] relative",
        className
      )}
    >
      <Image src={src} width={size} height={size} alt={"Small size"} />
      <span className="text-xs text-darkGrey/95 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center font-light">
        {title.toUpperCase()}
      </span>
    </div>
  );
}
