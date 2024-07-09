"use client";
import { cn } from "@/lib/utils";

interface ItemFooterProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
}
export default function ItemFooter(props: ItemFooterProps) {
  const { color } = props;
  return (
    <div>
      <props.icon
        className={cn(
          "text-2xl font-bold outline-none border-none active:outline-none active:border-none",
          color ? color : "text-grey"
        )}
      />
    </div>
  );
}
