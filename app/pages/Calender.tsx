"use client";
import Day from "./Day";
import SettingsButton from "../components/calender/SettingsButton";
import { useRef } from "react";

function Calender() {
  const settingsButtonRef = useRef<HTMLDivElement | null>(null);

  const month = '8';
  const day = '2';
  const dayOfWeek = '金';

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute z-10">
        <Day month={month} day={day} dayOfWeek={dayOfWeek} />
      </div>
      <div className="absolute z-20" ref={settingsButtonRef}>
        <SettingsButton />
      </div>
    </div>
  );
}

export default Calender;
