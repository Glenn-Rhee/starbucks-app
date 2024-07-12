import FooterView from "./views/footer/FooterView";

export default function Footer() {
  return (
    <footer className="flex justify-evenly w-screen px-4 pt-3 pb-5 items-center bg-white rounded-lg fixed bottom-0 gap-x-3 border-t-2">
      <FooterView />
    </footer>
  );
}
