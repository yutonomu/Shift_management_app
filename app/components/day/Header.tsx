import Image from "next/image";
import { useSession } from "next-auth/react";
import UserButton from "@/components/user-button";
import { deviceLabelMap } from "@/app/types/devices";
import SettingsButton from "../calender/SettingsButton";

interface HeaderProps {
  shiftLineLeftAndWidth: { left: number; width: number }[];
  deviceNames: string[];
  month: number;
  day: number;
  dayOfWeek: string;
}

function Header({
  shiftLineLeftAndWidth,
  deviceNames,
  month,
  day,
  dayOfWeek,
}: HeaderProps) {
  const imagePaths = [
    "/Icons/bi_pc-display-horizontal.svg",
    "/Icons/game-icons_pc.svg",
    "/Icons/raphael_pc.svg",
    "/Icons/bi_apple.svg",
    "/Icons/ri_apple-line.svg",
  ];

  const { data: session } = useSession();
  const user = session?.user;

  // デバイス名と区切り線を表示する
  const devices = () => {
    return shiftLineLeftAndWidth.map((shiftLine, index) => {
      const deviceKey = deviceNames[index] as keyof typeof deviceLabelMap;

      return (
        <div
          key={index}
          className="absolute flex items-end justify-center bottom-0"
          style={{
            width: `${shiftLine.width}px`,
            left: `${shiftLine.left + 1}px`,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-8 h-8">
              <Image
                src={imagePaths[index]}
                alt="device"
                fill
                sizes="100vw"
                className="object-scale-down"
              />
            </div>
            <div className="text-center text-sm lg:text-xl">
              {deviceLabelMap[deviceKey]}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <header className="flex flex-col bg-gray-200 w-full h-full">
      <div className="flex h-1/2">
        <SettingsButton />
        <div className="w-1/6 lg:w-[6vw] h-[5vh] text-[3vh] mt-3  lg:left-0 flex items-center justify-center">
          {month}月
        </div>
        <div className="absolute right-5 mt-3 lg:mt-5">
          <UserButton />
        </div>
      </div>

      <div className="relative w-full h-full flex  ">
        <div className="absolute w-1/6 h-full flex flex-col lg:flex-row-reverse items-center justify-end ml-2 lg:text-xl ">
          <div className="text-sm ">{dayOfWeek}</div>
          <div className="text-sm rounded-full bg-black text-white w-[8vw]  h-[8vw] flex items-center justify-center">
            {day}
          </div>
        </div>
        <div className="h-full">{devices()}</div>
      </div>
    </header>
  );
}

export default Header;
