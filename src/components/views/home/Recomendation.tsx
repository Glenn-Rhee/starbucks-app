// @refresh reset
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CardRecomendation from "./CardRecomendation";

export default function Recomendation() {
  return (
    <Card className="mt-5 mb-16 px-4 py-4">
      <div className="flex justify-between items-center text-darkGreen">
        <div>
          <h2 className="font-bold text-xl">For You</h2>
        </div>
        <div>
          <Link
            href={"/order"}
            className="flex items-center gap-x-2 text-sm text-darkGreen"
          >
            See more
            <span>
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="flex gap-x-2">
            <CardRecomendation />
            <CardRecomendation />
          </CarouselItem>
          <CarouselItem className="flex gap-x-2">
            <CardRecomendation />
            <CardRecomendation />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </Card>
  );
}
