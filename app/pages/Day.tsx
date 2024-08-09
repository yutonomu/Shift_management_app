"use client";

import Header from "../components/day/Header";
import Body from "../components/day/Body";
import InputShiftButton from "../components/day/InputShiftButton";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";

function Day() {
  // 指定可能なデバイス名のリスト
  const deviceNames: string[] = ["Pc-1", "Pc-2", "Pc-3", "Pc-4", "Pc-5"];

  const [shiftLineLeftAndWidth, setShiftLineLeftAndWidth] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const updateShiftLineLeftAndWidth = (left: number, width: number) => {
    setShiftLineLeftAndWidth({ left, width });
    console.log("left: ", left, "width: ", width);
  };

  return (
    <div className="relative w-screen h-screen">
      <Header />
      <div className="absolute z-10">
        <Body deviceNames={deviceNames} updateShiftLineLeftAndWidth={updateShiftLineLeftAndWidth}/>
      </div>
      <div className="absolute z-20 right-0 bottom-0">
        <InputShiftButton />
      </div>
    </div>
  );
}

export default Day;
