import Image from "next/image";
import ContainerFeedback from "./ContainerFeedback";

export default function SuccessOrder() {
  return (
    <ContainerFeedback>
      <div className="w-full flex items-center justify-center">
        <Image
          src={"/Success.png"}
          width={100}
          height={100}
          alt={"Success img"}
        />
      </div>
      <span className="text-lg font-semibold text-dark">
        Thank you for your order {":)"}
      </span>
    </ContainerFeedback>
  );
}
