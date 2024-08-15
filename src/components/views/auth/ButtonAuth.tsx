import { cn } from "@/lib/utils";
import { ImSpinner2 } from "react-icons/im";

interface ButtonAuthProps {
  onSubmit: () => void;
  disable?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}
export default function ButtonAuth(props: ButtonAuthProps) {
  const { onSubmit, disable, className, children, isLoading } = props;

  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      disabled={disable}
      className={cn(
        "w-full text-white font-semibold text-lg py-1 items-center gap-x-2 flex justify-center rounded-[8px]",
        {
          "cursor-not-allowed bg-green-900": disable || isLoading,
          "bg-mainGreen cursor-pointer": !disable && !isLoading,
        },
        className
      )}
    >
      {isLoading ? (
        <>
          <p>Loading ...</p>
          <ImSpinner2 className="animate-spin" />
        </>
      ) : (
        children
      )}
    </button>
  );
}
