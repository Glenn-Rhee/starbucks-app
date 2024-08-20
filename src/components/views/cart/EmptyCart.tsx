import { FaRegTrashAlt } from "react-icons/fa";
import ContainerFeedback from "./ContainerFeedback";

export default function EmptyCart() {
  return (
    <ContainerFeedback>
      <FaRegTrashAlt className="text-darkGreen text-7xl" />
      <span className="text-lg font-semibold">Your cart is empty</span>
    </ContainerFeedback>
  );
}
