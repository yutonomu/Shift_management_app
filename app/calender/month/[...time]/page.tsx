import React, { use, useEffect } from "react";
import Month from "@/app/pages/Month";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";

function MonthCalender() {
  const testDate: ShiftBlockType[] = [
    {
      id: "1",
      name: "test",
      selectedDevice: "PC-1",
      color: "red",
      userId: "1",
      startTime: new Date("2024-08-13"),
      endTime: new Date("2024-08-14"),
    },
    {
      id: "2",
      name: "test2",
      selectedDevice: "PC-2",
      color: "blue",
      userId: "2",
      startTime: new Date("2024-08-15"),
      endTime: new Date("2024-08-16"),
    },
    {
      id: "3",
      name: "test3",
      selectedDevice: "PC-1",
      color: "green",
      userId: "3",
      startTime: new Date("2024-08-13"),
      endTime: new Date("2024-08-14"),
    },
  ];

  return (
    <div>
      <Month shiftBlocks={testDate} />
    </div>
  );
}

export default MonthCalender;
