"use client";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { Coffe, Transaction } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

interface HeroProductProps {
  data: Coffe;
}

export default function HeroProduct(props: HeroProductProps) {
  const { data } = props;
  const { access } = useUser();
  const [isFavorite, setIsFavorite] = useState<Transaction | null>();
  const [favoritesCount, setFavoritesCount] = useState<number>(0);

  useEffect(() => {
    if (access) {
      const getFavorite = async () => {
        const response = await fetch("/api/favorited?idCoffe=" + data.id, {
          method: "GET",
          headers: {
            bearir: access || "",
          },
        });

        const dataResponse = (await response.json()) as ResponsePayload;
        if (dataResponse.status === "failed") {
          return toast("Failed get favorite", {
            description: dataResponse.message,
            duration: 1500,
          });
        }
        console.log(dataResponse);

        setIsFavorite(dataResponse.data);
        setFavoritesCount(dataResponse.data.coffeFav);
      };

      getFavorite();
    }
  }, [access]);

  async function handleFavorite() {
    const idFav = isFavorite ? isFavorite.id : "";
    const response = await fetch(
      "/api/favorited?idCoffe=" + data.id + "&idFav=" + idFav,
      {
        method: "POST",
        headers: {
          bearir: access || "",
        },
      }
    );

    const dataResponse = (await response.json()) as ResponsePayload;

    if (dataResponse.status === "failed") {
      return toast("Failed add", {
        description: dataResponse.message,
        duration: 1500,
      });
    }

    if (dataResponse.message.includes("delete")) {
      setIsFavorite(null);
      setFavoritesCount(favoritesCount - 1);
    } else {
      setFavoritesCount(favoritesCount + 1);
      setIsFavorite(dataResponse.data);
    }
  }

  return (
    <div className="flex flex-col mt-8 mb-14">
      <Image
        src={"/" + data.linkPicture.split("./")[1]}
        className="mx-auto w-auto mb-6 rounded-[10px]"
        width={160}
        height={160}
        priority
        alt="Coffe"
      />
      <div className="flex gap-x-2 items-center justify-between">
        <div className="flex flex-col gap-y-1 tracking-wide">
          <h3 className="text-dark text-lg font-bold">{data.name}</h3>
          <p className="text-sm text-darkGrey font-light">
            {data.description}{" "}
          </p>
        </div>
        {isFavorite === undefined ? (
          <ImSpinner2 className="animate-spin" />
        ) : Object.keys(isFavorite!).length < 2 ? (
          <button
            className="flex flex-col items-center"
            onClick={handleFavorite}
          >
            <FaRegStar size={30} className="text-yellow-600" />
            <span className="text-dark font-base text-xs">
              {favoritesCount}
            </span>
          </button>
        ) : (
          <button
            className="flex flex-col items-center"
            onClick={handleFavorite}
          >
            <FaStar size={30} className="text-yellow-600" />
            <span className="text-dark font-base text-xs">
              {favoritesCount}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
