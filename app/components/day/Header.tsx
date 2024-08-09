import Image from "next/image";

interface HeaderProps {
  shiftLineLeftAndWidth: { left: number; width: number }[];
  deviceNames: string[];
  month: string;
  day: string;
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

  // デバイス名と区切り線を表示する
  const devices = () => {
    return shiftLineLeftAndWidth.map((shiftLine, index) => {
      return (
        <div
          key={index}
          className="border-l-2 border-black absolute flex items-center justify-center"
          style={{
            width: `${shiftLine.width}px`,
            left: `${shiftLine.left + 1}px`,
            height: "100%",
            bottom: `0px`,
          }}
        >
          <div className="flex flex-col">
            <Image
              src={imagePaths[index]}
              alt="device"
              width={shiftLine.width / 2}
              height={shiftLine.width / 2}
            />
            <span style={{ fontSize: `${shiftLine.width / 4}px` }}>
              {deviceNames[index]}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col">
      <div
        className="w-[25vw] h-[5vh] ml-[10%] text-[2rem] flex items-center justify-center"
      >{month}月</div>
      <div className="relative flex">
        <div
          className="absolute bottom-0 flex flex-col items-center ml-2"
          style={{
            width: `${shiftLineLeftAndWidth[0].width}px`,
            left: `0px`,
            height: "60%",
            bottom: `0px`,
          }}
        >
          <div>{dayOfWeek}</div>
          <div>{day}</div>
        </div>
        <div className="h-[15vh] bottom-0">{devices()}</div>
      </div>
    </div>
  );
}

export default Header;
