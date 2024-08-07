import { cn } from "@/lib/utils";

interface SizeCoffeProps {
  className?: string;
  title: "S" | "M" | "L";
  valueActive: "S" | "M" | "L";
  setValueActive: (value: "S" | "M" | "L") => void;
}

export default function SizeCoffe(props: SizeCoffeProps) {
  const { className, title, valueActive, setValueActive } = props;

  return (
    <button
      className={cn(
        "border-darkGrey/20 p-5 border min-w-[18px] box-border rounded-[5px] relative",
        className,
        valueActive === title.toUpperCase()
          ? "bg-mainGreen/15 border border-mainGreen/60"
          : ""
      )}
      onClick={() => setValueActive(title)}
    >
      <span
        className={cn(
          "text-xs text-darkGrey/95 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center font-light",
          valueActive === title.toUpperCase() ? "text-mainGreen font-semibold" : ""
        )}
      >
        {title.toUpperCase()}
      </span>
    </button>
  );
}
