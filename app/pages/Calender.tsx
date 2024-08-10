"use client";
import Day from "./Day";
import SettingsButton from "../components/calender/SettingsButton";
import { useEffect, useRef, useState } from "react";
import { ShiftBlockType } from "../types/ShiftBlockType";
import { Devices } from "@prisma/client";

async function getShiftAllData({
  year,
  month,
  day,
}: CalenderProps): Promise<ShiftBlockType[]> {
  const response = await fetch("/api/shift/all", {
    cache: "no-cache",
  });

  // const response = await fetch(`/api/shift/day/${year}/${month}/${day}`, {
  //   cache: "no-cache",
  // });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const shiftAllData: ShiftBlockType[] = await response.json();
  console.log(shiftAllData);
  return shiftAllData;
}

interface CalenderProps {
  // number型にしたい
  year: string;
  month: string;
  day: string;
}

function Calender({ year, month, day }: CalenderProps) {
  const settingsButtonRef = useRef<HTMLDivElement | null>(null);

  // 指定可能なデバイス名のリスト
  // const deviceNames: string[] = ["白PC", "黒PC", "ノートPC", "Mac1", "Mac2"];
  const deviceNames: string[] = Object.values(Devices).filter(
    (value) => typeof value === "string"
  ) as string[];
  console.log("deviceNames", deviceNames);

  // シフトデータの状態を保持するstate
  const [shiftBlocks, setShiftBlocks] = useState<ShiftBlockType[]>([]);

  useEffect(() => {
    // シフトデータを非同期で取得
    const fetchShiftData = async () => {
      try {
        const data = await getShiftAllData({ year, month, day });
        setShiftBlocks(data);
      } catch (error) {
        console.error("Error fetching shift data:", error);
      }
    };

    fetchShiftData();
  }, []); // 空の依存配列で初回レンダリング時に実行

  // const month = "8";
  // const day = "2";
  // const dayOfWeek = "金";
  // year, month, dayからDateオブジェクトを作成
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const dayOfWeek = date.toLocaleDateString("ja-JP", { weekday: "short" });

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute z-10">
        <Day
          month={month}
          day={day}
          dayOfWeek={dayOfWeek}
          shiftBlocks={shiftBlocks}
          deviceNames={deviceNames}
        />
      </div>
      <div className="absolute z-20" ref={settingsButtonRef}>
        <SettingsButton />
      </div>
    </div>
  );
}

export default Calender;
