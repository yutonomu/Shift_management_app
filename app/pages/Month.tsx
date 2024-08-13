"use client";
import React, { use, useEffect } from "react";
import MonthCalendar from "../components/month/MonthCalendar";
import { ShiftBlockType } from "../types/ShiftBlockType";

interface MonthProps {
  shiftBlocks: ShiftBlockType[];
}

function Month({ shiftBlocks }: MonthProps) {
  return (
    <div>
      <MonthCalendar shiftBlocks={shiftBlocks} />
    </div>
  );
}

export default Month;
