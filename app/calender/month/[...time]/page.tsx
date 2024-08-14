import React, { use, useEffect } from "react";
import Month from "@/app/pages/Month";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";

interface MonthCalenderProps {
  shiftBlocks: ShiftBlockType[];
  nowPageTime: NowPageTime;
  deviceNames: string[];
}

function MonthCalender({
  shiftBlocks,
  nowPageTime,
  deviceNames,
}: MonthCalenderProps) {
  const testDate: ShiftBlockType[] = [
    {
      id: "1",
      name: "test",
      selectedDevice: "WHITE_PC",
      color: "red",
      userId: "1",
      startTime: new Date("2024-08-13 09:00"),
      endTime: new Date("2024-08-13 12:00"),
    },
    {
      id: "2",
      name: "test2",
      selectedDevice: "LAPTOP",
      color: "blue",
      userId: "2",
      startTime: new Date("2024-08-15 19:00"),
      endTime: new Date("2024-08-15 23:00"),
    },
    {
      id: "3",
      name: "test3",
      selectedDevice: "MAC2",
      color: "green",
      userId: "3",
      startTime: new Date("2024-08-13 1:00"),
      endTime: new Date("2024-08-13 10:00"),
    },
  ];

  const testNowPageTime: NowPageTime = {
    year: 2024,
    month: 8,
    day: 2,
  };

  const testDeviceNames: string[] = [
    "WHITE_PC",
    "BLACK_PC",
    "LAPTOP",
    "MAC1",
    "MAC2",
  ];
  return (
    <div className="w-screen h-screen">
      <Month
        shiftBlocks={testDate}
        nowPageTime={testNowPageTime}
        deviceNames={testDeviceNames}
      />
    </div>
  );
}

export default MonthCalender;
