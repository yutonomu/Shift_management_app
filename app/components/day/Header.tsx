import Image from "next/image";

interface HeaderProps {
  shiftLineLeftAndWidth: { left: number; width: number }[];
  deviceNames: string[];
}

function Header({ shiftLineLeftAndWidth, deviceNames }: HeaderProps) {
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
          className="border-l border-black absolute flex items-center justify-center"
          style={{
            width: `${shiftLine.width}px`,
            left: `${shiftLine.left + 1}px`,
            height: '60%',
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
            <span style={{ fontSize: `${shiftLine.width / 4}px` }}>{deviceNames[index]}</span>
          </div>
        </div>
      );
    });
  };

  return <div className="h-[20vh] relative">{devices()}</div>;
}

export default Header;
