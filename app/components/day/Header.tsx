
interface HeaderProps {
  shiftLineLeftAndWidth: { left: number; width: number }[];
  deviceNames: string[];
}

function Header({ shiftLineLeftAndWidth, deviceNames }: HeaderProps) {

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
            bottom: `0px`,
          }}
        >
          {`${deviceNames[index]}`}
        </div>
      );
    });
  }

  return (
    <div className="h-[20vh] relative">
      {devices()}
    </div>
  );
}

export default Header;
