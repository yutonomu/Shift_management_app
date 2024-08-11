import type { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { MutableRefObject, RefObject, use, useEffect, useRef } from "react";

interface ShiftLineProps {
  deviceName: string;
  shiftBlocks: ShiftBlockType[];
  calcBlockPosition: (
    startTime: Date,
    endTime: Date
  ) => { top: number; left: number; height: number };
}

function ShiftLine({
  deviceName,
  shiftBlocks,
  calcBlockPosition,
}: ShiftLineProps) {
  return (
    <div className="w-full flex flex-col relative">
      {/* ShiftLineの仕切り線 */}

      {shiftBlocks.map((userInput: ShiftBlockType, index: number) => {
        const { top, left, height } = calcBlockPosition(
          userInput.startTime,
          userInput.endTime
        );

        return (
          userInput.selectedDevice === deviceName && (
            <div
              key={index}
              className="absolute w-full border bg-white rounded-md"
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
