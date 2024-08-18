import { Cart, Coffe } from "@prisma/client";
export const deliveryFee = 2500;
export const orderFee = 2500;
export const packagingFee = 3000;

export const getTotalCart = (cart: Cart[], coffe: Coffe[]) => {
  const total = cart
    ?.map((cartItem) => {
      const dataCoffe = coffe.find(
        (coffeItem) => coffeItem.id === cartItem.idCoffe
      );
      return dataCoffe ? dataCoffe.price * cartItem.quantity : 0;
    })
    .reduce((total, price) => total + price, 0);

  return total;
};
