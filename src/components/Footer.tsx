"use client";
import { usePathname } from "next/navigation";
import FooterView from "./views/footer/FooterView";

export default function Footer() {
  const pathName = usePathname();

  if (pathName === "/cart") return null;
  if (pathName.includes("/order/")) return null;
  if (pathName.includes("/auth/")) return null;
  if (pathName === "/topup") return null;
  if (pathName === "/profile/detail") return null;

  return (
    <footer className="flex justify-evenly w-screen px-4 pt-3 pb-5 items-center bg-white rounded-lg fixed bottom-0 gap-x-3 border-t-2">
      <FooterView />
    </footer>
  );
}
