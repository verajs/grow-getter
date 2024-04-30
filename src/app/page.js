import Image from "next/image";
import Greeting from "./_components/Greeting";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-[#f4e9da] flex items-end justify-center">
      <div className="w-1/4 max-w-[300px]">
        <Image
          src="/plant1.png"
          layout="responsive"
          width={100}
          height={100}
          objectFit="contain"
          alt="Plant Image"
        />
      </div>
      <Greeting />
      <div className="absolute bottom-5 right-5 flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-300 shadow-md">
        <span className="text-sm text-black font-semibold">1/5</span>
      </div>
    </div>
  );
}
