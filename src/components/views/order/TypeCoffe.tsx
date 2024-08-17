import Option from "@/components/Option";
import { Coffe } from "@prisma/client";

export default function TypeCoffe() {
  const typesCoffe: Coffe["type"][] = [
    "Expresso",
    "Americano",
    "LongBlack",
    "Cappucino",
    "CoffeLatte",
    "MoccaLatte",
    "Afogato",
    "ColdBrew",
    "Macchiato",
  ];

  return <Option data={typesCoffe} initiateValue={typesCoffe[0]} />;
}
