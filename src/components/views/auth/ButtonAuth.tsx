import { cn } from "@/lib/utils";

interface ButtonAuthProps {
  onSubmit: () => void;
  disable?: boolean;
  className?: string;
  children: React.ReactNode;
}
export default function ButtonAuth(props: ButtonAuthProps) {
  const { onSubmit, disable, className, children } = props;

  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      disabled={disable}
      className={cn(
        "w-full text-white font-semibold text-lg py-1 rounded-[8px]",
        {
          "cursor-not-allowed bg-green-900": disable,
          "bg-mainGreen cursor-pointer": !disable,
        },
        className
      )}
    >
      {children}
    </button>
  );
}
