import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function Container(props: ContainerProps) {
  const { children, className } = props;

  return <div className={cn("w-full px-4", className)}>{children}</div>;
}
