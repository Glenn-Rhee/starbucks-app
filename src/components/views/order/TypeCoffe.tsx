import Option from "@/components/Option";

export default function TypeCoffe() {
  const typesCoffe = [
    "Expresso",
    "Americano",
    "Long Black",
    "Cappucino",
    "Caffe Latte",
    "Mocca Latte",
    "Afogato",
    "Cold Brew",
    "Macchiato",
  ];

  return <Option data={typesCoffe} initiateValue={typesCoffe[0]} />;
}
