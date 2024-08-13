// Calendar.tsx
import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";

interface MonthCalendarProps {
  shiftBlocks: ShiftBlockType[];
}

function MonthCalender({ shiftBlocks }: MonthCalendarProps) {
  const handleClick = (info: any) => {
    console.log("clicked", events);
    console.log("clicked", events[0]);
  };

  // カレンダー上に表示するイベントのデータ
  const events: { title: string; start: string; end: string }[] =
    shiftBlocks.map((block) => {
      // startとendに格納する値
      // Date型を文字列に変換. 月と日は1桁の場合は0埋めする
      const start = `${block.startTime.getFullYear()}-${String(
        block.startTime.getMonth() + 1
      ).padStart(2, "0")}-${String(block.startTime.getDate()).padStart(
        2,
        "0"
      )}`;
      const end = `${block.endTime.getFullYear()}-${String(
        block.endTime.getMonth() + 1
      ).padStart(2, "0")}-${String(block.endTime.getDate()).padStart(2, "0")}`;

      return {
        title: block.name,
        start: start,
        end: end,
      };
    });

  useEffect(() => {
    console.log("month calendar", shiftBlocks);
  }, []);
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locales={[jaLocale]}
      locale="ja"
      events={[...events]}
      eventClick={(info) => {
        handleClick(info);
      }}
    />
  );
}

export default MonthCalender;
