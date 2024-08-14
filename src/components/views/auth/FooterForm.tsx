import { cn } from "@/lib/utils";

interface FooterFormProps {
  children: React.ReactNode;
  className?: string;
}
export default function FooterForm(props: FooterFormProps) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        "flex flex-col items-start mt-4 px-1 w-full gap-y-2",
        className
      )}
    >
      {children}
    </div>
  );
}
