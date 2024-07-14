import { cn } from "@/lib/utils";

interface FilterItemProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}
export default function FilterItem(props: FilterItemProps) {
  const { children, title, className } = props;
  return (
    <div
      className={cn(
        "flex flex-col justify-center mb-3 overflow-auto",
        className
      )}
    >
      <h3 className="text-dark font-semibold text-lg">{title}</h3>
      {children}
    </div>
  );
}
