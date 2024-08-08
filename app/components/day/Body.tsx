"use client";
import ShiftLine from "@/app/components/day/ShiftLine";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { UserInputType } from "@/app/types/UserInputType";
import { time } from "console";

const deviceNames: string[] = ["Pc-1", "Pc-2", "Pc-3", "Pc-4", "Pc-5"];

const userInputs: UserInputType[] = [
  {
    name: "name1",
    selectedDevice: "Pc-1",
    startTime: "10:55",
    endTime: "15:36",
    color: "red",
  },
  {
    name: "name2",
    selectedDevice: "Pc-2",
    startTime: "15:55",
    endTime: "20:50",
    color: "blue",
  },
];

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

  // ShiftBlockの時間(Hour)の位置を計算
  function calcPosition(hour: number, minute: number) {
    let position = 0;
    if (
      // Hour の位置を計算
      timeLinesRef.current[hour - 1] !== undefined &&
      timeLinesRef.current[hour - 1] !== null
    ) {
      position = timeLinesRef.current[hour - 1]!.offsetTop;
    }

    if (
      // 0時以降の場合
      timeLinesRef.current[hour] !== undefined &&
      timeLinesRef.current[hour] !== null
    ) {
      position +=
        (timeLinesRef.current[hour]!.offsetTop - position) / (60 / minute); // 1分ごとの位置を計算
    } else if (
      // 24時の場合
      timeLinesRef.current[hour - 2] !== undefined &&
      timeLinesRef.current[hour - 2] !== null
    ) {
      position +=
        (timeLinesRef.current[hour - 2]!.offsetTop - position) / (60 / minute); // 1分ごとの位置を計算
    }
    return position;
  }

  // ShiftBlockの位置を計算
  const calcBlockPosition = (startTime: string, endTime: string) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const endHour = parseInt(endTime.split(":")[0]);
    const endMinute = parseInt(endTime.split(":")[1]);

    const top: number = calcPosition(startHour, startMinute); // 開始時間（Hour）のtopを計算
    const end: number = calcPosition(endHour, endMinute); // 終了時間（Hour）のtopを計算

    const height = end - top;

    return { top: top, left: 0, height: height };
  };

  // 各ShiftLineを作成
  const shiftLines = [...deviceNames].map((deviceName, i) => {
    return (
      <div
        key={deviceName}
        className="w-[16vw] h-full flex-none z-20"
        style={{ height: `${height}px` }}
      >
        <ShiftLine
          deviceName={deviceName}
          userInputs={userInputs}
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
