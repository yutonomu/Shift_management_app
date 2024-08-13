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
    <header className="flex flex-col bg-gray-200 w-full h-full gap-10">
      <div className="flex">
        <SettingsButton />
        <div className="w-[15vw] lg:w-[6vw] h-[5vh] text-[3vh] mt-3  lg:left-0 flex items-center justify-end">
          {month}月
        </div>
      </div>
      <div className="absolute right-5 mt-3 lg:mt-5">
        <UserButton />
      </div>

      <div className="relative w-full h-full flex">
        <div
          className="absolute w-full h-full bottom-0 flex flex-col lg:flex-row-reverse items-center ml-2 lg:text-xl "
          style={{
            width: `${shiftLineLeftAndWidth[0].width}px`,
            height: `${shiftLineLeftAndWidth[0].width}px`,
          }}
        >
          <div className="text-sm">{dayOfWeek}</div>
          <div className="text-sm rounded-full bg-black text-white w-[8vw] lg:w-10 h-[8vw] lg:h-10 flex items-center justify-center">
            {day}
          </div>
        </div>
        <div className="h-full">{devices()}</div>
      </div>
    </header>
  );
}

export default Header;
