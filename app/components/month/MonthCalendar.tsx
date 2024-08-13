// Calendar.tsx
import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { ShiftBlockType } from "@/app/types/ShiftBlockType";

interface MonthCalendarProps {
  shiftBlocks: ShiftBlockType[];
  setIsOpen: (isOpen: boolean) => void;
  setClickedBlock: (block: ShiftBlockType | null) => void;
}

function MonthCalender({
  shiftBlocks,
  setIsOpen,
  setClickedBlock,
}: MonthCalendarProps) {
  // クリックされたシフトの id と同じ id のシフトブロックを取得
  const handleClick = (info: any) => {
    const index = shiftBlocks.findIndex((block) => {
      return block.id === info.event.id;
    });
    setClickedBlock(shiftBlocks[index]); // クリックされたシフトと同じ id のシフトブロックをセット
    setIsOpen(true); // イベント編集シートを開く
  };

  // カレンダー上に表示するイベントのデータ
  const events: { title: string; start: Date; end: Date }[] = shiftBlocks.map(
    (block) => {
      return {
        id: block.id,
        backgroundColor: block.color,
        title: block.name,
        start: block.startTime,
        end: block.endTime,
      };
    }
  );

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale="ja"
        events={[...events]}
        eventClick={(info) => {
          return handleClick(info);
        }}
      />
    </div>
  );
}

export default MonthCalender;
