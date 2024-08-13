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

function MonthlyCalender({
  shiftBlocks,
  setIsOpen,
  setClickedBlock,
}: MonthCalendarProps) {
  // カレンダー上に表示するイベントのデータ
  const events: { title: string; start: Date; end: Date }[] = shiftBlocks.map(
    (shiftBlock) => {
      return {
        id: shiftBlock.id,
        backgroundColor: shiftBlock.color,
        title: shiftBlock.name,
        start: shiftBlock.startTime,
        end: shiftBlock.endTime,
      };
    }
  );

  // クリックされたシフトの id と同じ id のシフトブロックを取得
  const handleClick = (info: any) => {
    const index = shiftBlocks.findIndex((block) => {
      return block.id === info.event.id;
    });
    setClickedBlock(shiftBlocks[index]); // クリックされたシフトと同じ id のシフトブロックをセット
    setIsOpen(true); // イベント編集シートを開く
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        locales={[jaLocale]}
        locale="ja"
        events={[...events]}
        eventClick={(info) => {
          return handleClick(info);
        }}
        eventContent={(info) => {
          return (
            <div
              style={{
                backgroundColor: info.event.backgroundColor,
                color: "white",
                borderRadius: "5px",
                padding: "5px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {info.event.title}
            </div>
          );
        }}
      />
    </div>
  );
}

export default MonthlyCalender;
