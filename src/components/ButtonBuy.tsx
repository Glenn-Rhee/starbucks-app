import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ButtonBuyProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonBuy(props: ButtonBuyProps) {
  const { children, className, onClick } = props;

  return (
    <Button
      className={cn("hover:bg-[#26723E] bg-mainGreen text-white", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
