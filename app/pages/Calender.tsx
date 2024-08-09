"use client";
import Day from "./Day";
import SettingsButton from "../components/calender/SettingsButton";
import { useRef } from "react";
import { ShiftBlockType } from "../types/ShiftBlockType";

function Calender() {
  const settingsButtonRef = useRef<HTMLDivElement | null>(null);

  const shiftBlocks: ShiftBlockType[] = [
    {
      name: "name1",
      selectedDevice: "ノートPC",
      startTime: "10:55",
      endTime: "20:36",
      color: "red",
    },
    {
      name: "name2",
      selectedDevice: "Mac1",
      startTime: "9:55",
      endTime: "12:50",
      color: "blue",
    },
  ];
  
  const month = '8';
  const day = '2';
  const dayOfWeek = '金';

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute z-10">
        <Day month={month} day={day} dayOfWeek={dayOfWeek} shiftBlocks={shiftBlocks} />
      </div>
      <div className="absolute z-20" ref={settingsButtonRef}>
        <SettingsButton />
      </div>
    </div>
  );
}

export default Calender;
