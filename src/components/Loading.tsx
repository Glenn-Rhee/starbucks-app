import { cn } from "@/lib/utils";
import { ImSpinner2 } from "react-icons/im";

interface LoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Loading(props: LoadingProps) {
  const { children, className } = props;
  return (
    <>
      {children}
      <div
        className={cn(
          "min-w-full flex items-center justify-center min-h-[70vh]",
          className
        )}
      >
        <ImSpinner2 className="animate-spin text-mainGreen text-3xl" />
      </div>
    </>
  );
}
