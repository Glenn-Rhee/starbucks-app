"use client";
import { ResponsePayload } from "@/models/user-model";
import { useUser } from "@/store/useUser";
import { Coffe } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

interface ContentHistoryProps {
  title: string;
  date: Date;
  balance: number;
  idCoffe: string;
}

export default function ContentHistory(props: ContentHistoryProps) {
  const { title, date, balance, idCoffe } = props;
  const { access } = useUser();
  const [image, setImage] = useState<string>("");
  const dated = new Date(date);
  let formattedDate = dated
    .toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    })
    .replace(",", " -");
  formattedDate = formattedDate.split("pukul").join("-");

  useEffect(() => {
    if (access) {
      if (title === "Top up") {
        setImage("Top up");
        return;
      }
      const getData = async () => {
        const response = await fetch("/api/coffe?id=" + idCoffe, {
          method: "GET",
          headers: {
            bearir: access,
          },
        });

        const dataResponse = (await response.json()) as ResponsePayload;
        if (dataResponse.status === "failed") {
          return toast("Error", {
            description: dataResponse.message,
            duration: 2000,
          });
        }

        const data = dataResponse.data as Coffe;

        setImage(data.linkPicture);
      };

      getData();
    }
  }, [access, idCoffe, title]);

  return (
    <div className="flex justify-between px-1 items-center mb-2 border-b border-lightGrey/50 pb-3 last:pb-0 last:border-none">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <div className="flex items-center justify-center aspect-square bg-lightGrey/10 border-lightGrey/60 min-h-10 min-w-14 border rounded-[5px]">
            {image === "" ? (
              <ImSpinner2 className="animate-spin text-mainGreen text-3xl" />
            ) : image === "Top up" ? (
              <FaPlusCircle size={34} className="text-mainGreen" />
            ) : (
              <Image
                src={"/" + image.split("./")[1]}
                width={41}
                height={41}
                alt={title}
                className="rounded-[5px] aspect-square text-xs"
              />
            )}
          </div>
          <div className="flex flex-col justify-center -mt-1 ">
            <h5 className="text-dark font-medium text-base">{title}</h5>
            <span className="text-darkGrey font-medium text-sm">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
      <span className="text-dark font-medium text-sm">
        Rp {balance.toLocaleString("id-ID")}
      </span>
    </div>
  );
}
