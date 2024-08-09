"use client";

import Header from "../components/day/Header";
import Body from "../components/day/Body";
import InputShiftButton from "../components/day/InputShiftButton";
import { useState } from "react";

interface DayProps {
  month: string;
  day: string;
  dayOfWeek: string;
}

function Day({ month, day, dayOfWeek }: DayProps) {
  // 指定可能なデバイス名のリスト
  const deviceNames: string[] = ["白PC", "黒PC", "ノートPC", "Mac1", "Mac2"];

  // 各デバイス名の区切り線のleftとデバイス名を表示するためのwidth
  const [shiftLineLeftAndWidth, setShiftLineLeftAndWidth] = useState<{ left: number; width: number }[]>([...Array(deviceNames.length).fill({ left: 0, width: 0 })]);

  // shiftLineLeftAndWidthのindex番目の要素を更新する
  const updateShiftLineLeftAndWidth = (left: number, width: number, index: number) => {
    setShiftLineLeftAndWidth(prevState =>{
      const updatedArray = [...prevState];
      updatedArray[index] = { left, width };
      console.log(updatedArray[index]);
      return updatedArray;  
    });
  };

  return (
    <div className="relative w-screen h-screen">
      <Header shiftLineLeftAndWidth={shiftLineLeftAndWidth} deviceNames={deviceNames} month={month} day={day} dayOfWeek={dayOfWeek} />
      <div className="absolute z-10">
        <Body deviceNames={deviceNames} updateShiftLineLeftAndWidth={updateShiftLineLeftAndWidth}/>
      </div>
      <div className="absolute z-20 m-[10vw] right-0 bottom-0">
        <InputShiftButton />
      </div>
    </div>
  );
}

export default Day;
