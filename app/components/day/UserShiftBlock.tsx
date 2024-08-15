import React, { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import InputShiftForm from "./InputShiftForm";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";

interface UserShiftBlockProps {
  userInput: ShiftBlockType;
  deviceNames: string[];
  nowPageTime: NowPageTime;
  top: number;
  height: number;
  left: number;
  index: number;
  shiftBlocks: ShiftBlockType[];
}
function UserShiftBlock({
  userInput,
  deviceNames,
  nowPageTime,
  top,
  height,
  left,
  index,
  shiftBlocks,
}: UserShiftBlockProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <div
          key={index}
          className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black"
          style={{
            top: `${top}px`,
            height: `${height}px`,
            left: `${left}px`,
            backgroundColor:
              userInput.isOverlapShiftId !== null ? "red" : userInput.color,
          }}
          onClick={() => {
            setIsSheetOpen(true);
          }}
        >
          {userInput.name}
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
        <InputShiftForm
          key={index}
          id={userInput.id}
          userId={userInput.userId}
          deviceNames={deviceNames}
          dateTime={userInput.startTime}
          start={userInput.startTime}
          end={userInput.endTime}
          defaultDeviceName={userInput.selectedDevice}
          isEdit={true}
          nowPageTime={nowPageTime}
          shiftBlocks={shiftBlocks}
          setIsSheetOpen={setIsSheetOpen}
        />
      </SheetContent>
    </Sheet>
  );
}

export default UserShiftBlock;
