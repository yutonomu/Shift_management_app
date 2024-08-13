"use client";
import React, { use, useEffect } from "react";
import MonthCalendar from "../components/month/MonthCalendar";
import { ShiftBlockType } from "../types/ShiftBlockType";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { EventClickArg } from "@fullcalendar/core/index.js";
import InputShiftForm from "@/app/components/day/InputShiftForm";
import { NowPageTime } from "@/app/types/NowPageTime";

interface MonthProps {
  shiftBlocks: ShiftBlockType[];
}

function Month({ shiftBlocks }: MonthProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [clickedBlock, setClickedBlock] = React.useState<ShiftBlockType | null>(
    null
  );

  const testNowPageTime: NowPageTime = {
    year: 2024,
    month: 8,
    day: 2,
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <MonthCalendar
        shiftBlocks={shiftBlocks}
        setIsOpen={setIsOpen}
        setClickedBlock={setClickedBlock}
      />

      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
          <InputShiftForm
            id={clickedBlock?.id}
            userId={clickedBlock?.userId}
            deviceNames={
              clickedBlock?.selectedDevice ? [clickedBlock.selectedDevice] : []
            }
            defaultDeviceName={clickedBlock?.selectedDevice || ""}
            dateTime={clickedBlock?.startTime || new Date()}
            start={clickedBlock?.startTime || new Date()}
            end={clickedBlock?.endTime || new Date()}
            nowPageTime={testNowPageTime}
            isEdit={true}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Month;
