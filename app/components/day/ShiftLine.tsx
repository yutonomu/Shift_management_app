import type { ShiftBlockType } from "@/app/types/ShiftBlockType";
import InputShiftForm from "./InputShiftForm";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

interface ShiftLineProps {
  deviceNames: string[];
  deviceName: string;
  shiftBlocks: ShiftBlockType[];
  calcBlockPosition: (
    startTime: Date,
    endTime: Date
  ) => { top: number; left: number; height: number };
}

function ShiftLine({
  deviceNames,
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
            <Sheet>
              <SheetTrigger>
                <div
                  key={index}
                  className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${left}px`,
                    backgroundColor: userInput.color,
                  }}
                >
                  {userInput.name}
                </div>
              </SheetTrigger>
              <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
                <InputShiftForm
                  deviceNames={deviceNames}
                  dateTime={userInput.startTime}
                  start={userInput.startTime}
                  end={userInput.endTime}
                  defaultDeviceName={userInput.selectedDevice}
                  isEdit={true}
                />
              </SheetContent>
            </Sheet>
          )
        );
      })}
    </div>
  );
}

export default ShiftLine;
