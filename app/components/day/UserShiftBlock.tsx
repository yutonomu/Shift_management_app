import React from "react";
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
}
function UserShiftBlock({
  userInput,
  deviceNames,
  nowPageTime,
  top,
  height,
  left,
  index,
}: UserShiftBlockProps) {
  return (
    <Sheet>
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
        >
          {userInput.name}
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
        <InputShiftForm
          id={userInput.id}
          userId={userInput.userId}
          deviceNames={deviceNames}
          dateTime={userInput.startTime}
          start={userInput.startTime}
          end={userInput.endTime}
          defaultDeviceName={userInput.selectedDevice}
          isEdit={true}
          nowPageTime={nowPageTime}
        />
      </SheetContent>
    </Sheet>
  );
}

export default UserShiftBlock;
