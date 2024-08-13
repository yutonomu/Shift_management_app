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
      startTime: new Date("2024-08-13 09:00"),
      endTime: new Date("2024-08-13 12:00"),
    },
    {
      id: "2",
      name: "test2",
      selectedDevice: "PC-2",
      color: "blue",
      userId: "2",
      startTime: new Date("2024-08-15 19:00"),
      endTime: new Date("2024-08-15 23:00"),
    },
    {
      id: "3",
      name: "test3",
      selectedDevice: "PC-1",
      color: "green",
      userId: "3",
      startTime: new Date("2024-08-13 1:00"),
      endTime: new Date("2024-08-13 10:00"),
    },
  ];

  return (
    <div>
      <Month shiftBlocks={testDate} />
    </div>
  );
}

export default MonthCalender;
