import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface SearchContentProps {
  className?: string;
  placeholder: string;
  children?: React.ReactNode;
}

export default function SearchContent(props: SearchContentProps) {
  const { className, placeholder, children } = props;
  return (
    <div
      className={cn(
        "w-[85%] bg-white flex items-center rounded-[9px] px-2 shadow-md py-[0.5px]",
        className
      )}
    >
      <CiSearch className="text-md text-darkGrey" />
      <Input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none placeholder:text-darkGrey text-darkGrey"
      />
      {children}
    </div>
  );
}
