import { cn } from "@/lib/utils";
import Link from "next/link";

interface LinkAuthProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function LinkAuth(props: LinkAuthProps) {
  const { children, className, href } = props;
  return (
    <Link
      href={href}
      className={cn(
        "text-blue-600 hover:underline text-xs tracking-wide",
        className
      )}
    >
      {children}
    </Link>
  );
}
