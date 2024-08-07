import Image from "next/image";

export default function HeaderProfile() {
  return (
    <div className="w-screen bg-mainGreen px-4 pt-5 pb-8">
      <div className="flex items-center gap-x-4">
        <Image
          src={"/profile-pict.jpg"}
          width={70}
          height={70}
          alt={"Profile"}
          className="w-auto rounded-full"
        />
        <div className="text-white">
          <h5 className="text-white text-lg font-bold">
            Raisya Ariana Asfriansah
          </h5>
          <p className="font-light text-sm">085773094308</p>
        </div>
      </div>
    </div>
  );
}
