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

interface MonthProps {
  shiftBlocks: ShiftBlockType[];
}

function Month({ shiftBlocks }: MonthProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [clickedBlock, setClickedBlock] = React.useState<ShiftBlockType | null>(
    null
  );

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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save whenre done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div>{clickedBlock?.startTime.toLocaleString()}</div>
            <div className="grid grid-cols-4 items-center gap-4">test</div>
            <div className="grid grid-cols-4 items-center gap-4">testestse</div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={handleClose}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Month;
