import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ButtonBuyProps {
  children: React.ReactNode;
  className?: string;
}

export default function ButtonBuy(props: ButtonBuyProps) {
  const { children, className } = props;

  return (
    <Button
      className={cn(
        "hover:bg-[#26723E] bg-mainGreen text-white",
        className
      )}
    >
      {children}
    </Button>
  );
}
