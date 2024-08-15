"use client";
import React, { useEffect, useState } from "react";
import Month from "@/app/pages/Month";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import { NowPageTime } from "@/app/types/NowPageTime";
import { Devices } from "@prisma/client";

async function getShiftMonthData({
  year,
  month,
  day,
}: NowPageTime): Promise<ShiftBlockType[]> {
  const response = await fetch(`/api/shift/month/${year}/${month}/`, {
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

const MonthCalender = ({ params }: { params: { time: number } }) => {
  const today = new Date();
  let date = new Date(params.time);
  let [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    today.getDate(),
  ];
  const nowPageTime: NowPageTime = { year, month, day };

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
        const data = await getShiftMonthData({ year, month, day });
        setShiftBlocks(data);
      } catch (error) {
        console.error("Error fetching shift data:", error);
      }
    };

    fetchShiftData();
  }, []); // 空の依存配列で初回レンダリング時に実行

  return (
    <div className="w-screen h-screen">
      <Month
        shiftBlocks={shiftBlocks}
        nowPageTime={nowPageTime}
        deviceNames={deviceNames}
      />
    </div>
  );
};

export default MonthCalender;
