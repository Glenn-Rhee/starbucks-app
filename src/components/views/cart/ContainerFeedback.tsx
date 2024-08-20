import { cn } from "@/lib/utils";

interface ContainerFeedbackProps {
  children: React.ReactNode;
  className?: string;
}
export default function ContainerFeedback(props: ContainerFeedbackProps) {
  const { children, className } = props;
  return (
    <div
      className={cn(
        "min-w-full min-h-[76vh] flex items-center justify-center",
        className
      )}
    >
      <div className="flex flex-col items-center gap-y-2">{children}</div>
    </div>
  );
}
