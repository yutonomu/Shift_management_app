import type { UserInputType } from "@/app/types/UserInputType";
import { use, useEffect, useRef } from "react";

interface ShiftLineProps {
  userInput: UserInputType;
  calcBlockPosition: (
    startTime: string,
    endTime: string
  ) => { top: number; left: number; height: number };
}

function ShiftLine({ userInput, calcBlockPosition }: ShiftLineProps) {
  const { top, left, height } = calcBlockPosition(
    userInput.startTime,
    userInput.endTime
  );

  const debugRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("debug: ",debugRef.current?.offsetTop);
  }, []);

  return (
    <div className="w-full h-full flex flex-col border-l border-black relative">
      {/* ShiftLineの仕切り線 */}
      <div
        className="absolute w-full"
        style={{
          top: `${top}px`,
          height: `${height}px`,
          left: `${left}px`,
          backgroundColor: userInput.color,
        }}
        ref={debugRef}
      >
        {userInput.name}
      </div>
    </div>
  );
}

export default ShiftLine;
