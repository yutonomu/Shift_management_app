"use client";
import React from "react";
import MonthlyCalendar from "../components/month/MonthlyCalendar";
import { ShiftBlockType } from "../types/ShiftBlockType";
import { SheetContent, Sheet } from "@/components/ui/sheet";

import InputShiftForm from "@/app/components/day/InputShiftForm";
import { NowPageTime } from "@/app/types/NowPageTime";

interface MonthProps {
  shiftBlocks: ShiftBlockType[];
  nowPageTime: NowPageTime;
  deviceNames: string[];
}

function Month({ shiftBlocks, nowPageTime, deviceNames }: MonthProps) {
  const [isOpen, setIsOpen] = React.useState(false); // シフト編集シートの開閉状態
  const [clickedBlock, setClickedBlock] = React.useState<ShiftBlockType | null>(
    null
  ); // クリックされたシフトブロック

  // シフト編集シートを閉じる
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <MonthlyCalendar
        shiftBlocks={shiftBlocks}
        setIsOpen={setIsOpen}
        setClickedBlock={setClickedBlock}
      />

      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
          <InputShiftForm
            id={clickedBlock?.id}
            userId={clickedBlock?.userId}
            deviceNames={deviceNames}
            defaultDeviceName={clickedBlock?.selectedDevice || ""}
            dateTime={clickedBlock?.startTime || new Date()}
            start={clickedBlock?.startTime || new Date()}
            end={clickedBlock?.endTime || new Date()}
            nowPageTime={nowPageTime}
            isEdit={true}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Month;
