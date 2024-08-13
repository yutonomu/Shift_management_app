import Image from "next/image";
import { useSession } from "next-auth/react";
import UserButton from "@/components/user-button";
import { deviceLabelMap } from "@/app/types/devices";

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
          className="absolute flex items-end justify-center"
          style={{
            width: `${shiftLine.width}px`,
            left: `${shiftLine.left + 1}px`,
            height: "100%",
            bottom: `0px`,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-10 h-10 ">
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
    <header className="flex flex-col bg-gray-200 lg:h-50">
      <div className="w-[25vw] h-[5vh] ml-[10%] mt-[3%] lg:left-0 lg:m-0 text-[3vh] flex items-center justify-center">
        {month}月
      </div>
      <div className="absolute right-5 mt-3 lg:mt-5">
        <UserButton />
      </div>

      <div className="relative flex">
        <div
          className="absolute flex flex-col items-center ml-2  lg:text-6xl"
          style={{
            width: `${shiftLineLeftAndWidth[0].width}px`,
            height: `${shiftLineLeftAndWidth[0].width}px`,
          }}
        >
          {/* <div>{dayOfWeek}</div>
          <div className="rounded-full bg-black text-white w-[8vw] h-[8vw] flex items-center justify-center">
            {day}
          </div> */}
        </div>
        <div className="h-[10vh] bottom-0">{devices()}</div>
      </div>
    </header>
  );
}

export default Header;
