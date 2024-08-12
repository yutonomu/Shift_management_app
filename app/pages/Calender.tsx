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
  const response = await fetch(`/api/shift/day/${year}/${month}/${day}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const shiftDayBlocks: ShiftBlockType[] = await response.json();
  // startTimeとendTimeをDateオブジェクトに変換
  shiftDayBlocks.forEach((block) => {
    block.startTime = new Date(block.startTime);
    block.endTime = new Date(block.endTime);
  });

  return shiftDayBlocks;
}

interface CalenderProps {
  year: number;
  month: number;
  day: number;
}

function Calender({ year, month, day }: CalenderProps) {
  const settingsButtonRef = useRef<HTMLDivElement | null>(null);

  // 指定可能なデバイス名のリスト
  const deviceNames: string[] = Object.values(Devices).filter(
    (value) => typeof value === "string"
  ) as string[];

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

  // year, month, dayからDateオブジェクトを作成
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.toLocaleDateString("ja-JP", { weekday: "short" });

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute z-10">
        <Day
          year={year}
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
