// @refresh reset
import CoffeItem from "./CoffeItem";
import TypeCoffe from "./TypeCoffe";

export default function Menu() {
  const coffeData = [
    { title: "Expresso Hot", description: "With Whipped Milk", price: 25000 },
    { title: "Expresso Hot", description: "With Whipped Milk", price: 25000 },
    { title: "Expresso Hot", description: "With Whipped Milk", price: 25000 },
    { title: "Expresso Hot", description: "With Whipped Milk", price: 25000 },
    { title: "Expresso Hot", description: "With Whipped Milk", price: 25000 },
    { title: "Expresso Hot", description: "With Whipped Milk", price: 25000 },
    { title: "Expresso Hot", description: "With Whipped Milk", price: 25000 },
  ];
  return (
    <div className="mt-3 mb-20">
      <h3 className="text-lg font-semibold text-dark">Menu</h3>
      <div className="bg-white shadow-sm shadow-dark/15 rounded-[5px] flex flex-col gap-y-2">
        <TypeCoffe />
        {coffeData.map((item) => (
          <CoffeItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
