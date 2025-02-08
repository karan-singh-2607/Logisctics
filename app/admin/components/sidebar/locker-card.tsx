import { LOCKER, SWING } from "@/public";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function LockerCard() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="mt-3 w-full relative">
          <div className="bg-[#232326] relative overflow-hidden rounded-xl h-28">
            <div className="absolute right-0 top-0 h-28 z-10">
              <SWING />
            </div>
          </div>
          <div className="left-0 ml-6 mt-6 absolute top-0">
            <div className="w-full mb-2">
              <LOCKER />
            </div>
            <div className="text-gray-500 text-sm mt-3">
              Get the parcels even <br /> closer
            </div>
          </div>
          <a
            className="absolute right-5 top-10 z-10"
            href="https://www.locker.ge/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="rounded-full h-10 w-10 bg-secondary flex justify-center items-center">
              <div className=" flex justify-center items-center ">
              <ChevronRight color="#fff"/>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
