"use client";
import ShiftLine from "@/app/components/day/ShiftLine";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { UserInputType } from "@/app/types/UserInputType";
import { time } from "console";

const testUserInput: UserInputType = {
  name: "name",
  selectedDevice: "Pc-1",
  startTime: "3:00",
  endTime: "9:00",
  color: "red",
};

function Body() {
  const deviceNum = 5; // 1画面に表示するShiftLineの数
  const shiftLineHeight = useRef<HTMLDivElement | null>(null); // ShiftLineの高さを取得するためのref
  const timeLinesRef = useRef<(HTMLDivElement | null)[]>([]); // 時刻の横線の高さを取得するためのrefの配列

  const [height, setHeight] = useState(0); // ShiftLineの高さ

  // 1:00 ~ 23:00 の文字列を作成
  const times: string[] = Array.from(
    { length: 23 },
    (_: unknown, i: number): string => `${i + 1}:00`
  );

  useLayoutEffect(() => {
    if (shiftLineHeight.current) {
      setHeight(shiftLineHeight.current.offsetHeight);
    }
    // timeLinesRef.currentの長さをtimesの長さに合わせて初期化
    timeLinesRef.current = timeLinesRef.current.slice(0, times.length);
  }, [times]);

  // 時刻の隣に横線を描く要素を作成
  const timeWithLine = (time: string, index: number) => {
    const isFirst: boolean = index === 0; // 最初の行かどうか
    const isLast: boolean = index === times.length - 1; // 最後の行かどうか
    return (
      <div
        className={`flex items-center w-full ${isFirst ? "mt-2" : ""} ${
          isLast ? "mb-2" : "mb-1"
        }`} // 最初の行と最後の行のマージンを調整。それ以外は通常のマージン
      >
        <span className="w-[15vw] text-lg flex justify-center">{time}</span>{" "}
        {/* 時刻 */}
        <div
          className="flex-grow border-t border-black"
          ref={(el) => {
            timeLinesRef.current[index] = el;
          }}
        ></div>{" "}
        {/* 時刻の横に引く線 */}
      </div>
    );
  };

  // 時刻と横線の背景を作成
  const timeLines = (
    <div className="w-[100vw] absolute z-10" ref={shiftLineHeight}>
      {" "}
      {/* timeLineの高さを shiftLine の縦幅とするために ref で取得 */}
      {times.map((time: string, index: number) => (
        <div key={index}>{timeWithLine(time, index)}</div> // 時刻と横線を表示
      ))}
    </div>
  );

  // ShiftBlockの位置を計算
  const calcBlockPosition = (startTime: string, endTime: string) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const endHour = parseInt(endTime.split(":")[0]);
    const endMinute = parseInt(endTime.split(":")[1]);

    // const top = startHour * 60 + startMinute;
    // const height = endHour * 60 + endMinute - top;
    console.log("startHour", startHour);
    let top:number = 0;
    let end:number = 0;

    if (
      timeLinesRef.current[startHour - 1] !== undefined &&
      timeLinesRef.current[startHour - 1] !== null
    ) {
      top = timeLinesRef.current[startHour - 1]!.offsetTop;
    }
    
    if (
      timeLinesRef.current[endHour - 1] !== undefined &&
      timeLinesRef.current[endHour - 1] !== null
    ) {
      end = timeLinesRef.current[endHour - 1]!.offsetTop;
    }
    
    const height = end - top;
    
    console.log("top", top);
    return { top: top, left: 0, height: height };
  };

  // 各ShiftLineを作成
  const shiftLines = [...Array(deviceNum)].map((_, i) => {
    return (
      <div
        key={i}
        className="w-[16vw] h-full flex-none z-20"
        style={{ height: `${height}px` }}
      >
        <ShiftLine
          userInput={testUserInput}
          calcBlockPosition={calcBlockPosition}
        />
      </div>
    );
  });

  return (
    <div className="w-screen h-[80vh]">
      <ScrollArea className="w-full h-full rounded-md border">
        <div className="relative w-full h-full">
          {timeLines}
          <div className="flex w-full h-full justify-end">{shiftLines}</div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Body;
