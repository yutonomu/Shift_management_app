import type { UserInputType } from "@/app/types/UserInputType";
import { use, useEffect, useRef } from "react";

interface ShiftLineProps {
  deviceName: string;
  userInputs: UserInputType[];
  calcBlockPosition: (
    startTime: string,
    endTime: string
  ) => { top: number; left: number; height: number };
}

function ShiftLine({ deviceName, userInputs, calcBlockPosition }: ShiftLineProps) {

  return (
    <div className="w-full h-full flex flex-col border-l border-black relative">
      {/* ShiftLineの仕切り線 */}
      {userInputs.map((userInput:UserInputType, index:number) => {
        const { top, left, height } = calcBlockPosition(
          userInput.startTime,
          userInput.endTime
        );
        
        return (
          userInput.selectedDevice === deviceName && (
            <div
              key={index}
              className="absolute w-full"
              style={{
                top: `${top}px`,
                height: `${height}px`,
                left: `${left}px`,
                backgroundColor: userInput.color,
              }}
            >
              {userInput.name}
            </div>
          )
        );
      })}
    </div>
  );
}

export default ShiftLine;
