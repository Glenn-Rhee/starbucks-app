import Image from "next/image";

export default function HeroProduct() {
  return (
    <div className="flex flex-col mt-8 mb-14">
      <Image
        src={"/coffe.png"}
        className="mx-auto mb-6"
        width={160}
        height={160}
        alt="Coffe"
      />
      <div className="flex flex-col gap-y-1 mt-3 tracking-wide">
        <h3 className="text-dark text-lg font-bold">Cappuccino</h3>
        <p className="text-sm text-darkGrey font-light">
          Sirup kacang toffee dicampur dengan es dan susu, lalu di atasnya
          diberi krim kocok dan topping rasa kacang toffee yang nikmat.
        </p>
      </div>
    </div>
  );
}
