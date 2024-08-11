"use client";

import Header from "../components/day/Header";
import Body from "../components/day/Body";
import InputShiftButton from "../components/day/InputShiftButton";
import { useState } from "react";
import type { ShiftBlockType } from "@/app/types/ShiftBlockType";

interface DayProps {
  month: string;
  day: string;
  dayOfWeek: string;
  shiftBlocks: ShiftBlockType[];
}

function Day({ month, day, dayOfWeek, shiftBlocks }: DayProps) {
  // 指定可能なデバイス名のリスト
  const deviceNames: string[] = ["白PC", "黒PC", "ノートPC", "Mac1", "Mac2"];

  // 各デバイス名の区切り線のleftとデバイス名を表示するためのwidth
  const [shiftLineLeftAndWidth, setShiftLineLeftAndWidth] = useState<
    { left: number; width: number }[]
  >([...Array(deviceNames.length).fill({ left: 0, width: 0 })]);

  // shiftLineLeftAndWidthのindex番目の要素を更新する
  const updateShiftLineLeftAndWidth = (
    left: number,
    width: number,
    index: number
  ) => {
    setShiftLineLeftAndWidth((prevState) => {
      const updatedArray = [...prevState];
      updatedArray[index] = { left, width };
      console.log(updatedArray[index]);
      return updatedArray;
    });
  };

  return (
    <div className="relative w-screen h-screen">
      <Header
        shiftLineLeftAndWidth={shiftLineLeftAndWidth}
        deviceNames={deviceNames}
        month={month}
        day={day}
        dayOfWeek={dayOfWeek}
      />
      <div className="absolute z-10">
        <Body
          deviceNames={deviceNames}
          shiftBlocks={shiftBlocks}
          updateShiftLineLeftAndWidth={updateShiftLineLeftAndWidth}
        />
      </div>
      <div className="absolute z-20 mb-[10vw] mr-[5vw] right-0 bottom-0">
        <InputShiftButton
          deviceNames={deviceNames}
          dateTime={
            new Date(new Date().getFullYear(), parseInt(month), parseInt(day))
          }
        />
      </div>
    </div>
  );
}

export default Day;
