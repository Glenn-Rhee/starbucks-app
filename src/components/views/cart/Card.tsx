import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export default function Card(props: CardProps) {
  const { children, className } = props;

  return (
    <div className={cn("min-w-full bg-white px-2 py-1", className)}>
      {children}
    </div>
  );
}
