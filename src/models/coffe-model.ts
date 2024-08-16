interface CoffeRequest {
  name: string;
  description: string;
  price: number;
  linkPicture: string;
  type:
    | "Expresso"
    | "Americano"
    | "LongBlack"
    | "Cappucino"
    | "CoffeLatte"
    | "MoccaLatte"
    | "Afogato"
    | "ColdBrew"
    | "Macchiato";
}
