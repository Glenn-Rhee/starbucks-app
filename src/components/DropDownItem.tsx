import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "./ui/dropdown-menu";

interface DropDownItemProps {
  className?: string;
  children: React.ReactNode;
}
export default function DropDownItem(props: DropDownItemProps) {
  const { className, children } = props;
  return (
    <DropdownMenuItem
      className={cn("cursor-pointer flex items-center gap-x-3", className)}
    >
      {children}
    </DropdownMenuItem>
  );
}
