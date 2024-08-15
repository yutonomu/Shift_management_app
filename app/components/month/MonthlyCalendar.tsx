// Calendar.tsx
import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import interactionPlugin from "@fullcalendar/interaction";
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

  // 重複しているシフトのが存在する日付の背景色を赤にする
  const backgroundEvents: {
    start: string;
    end: string;
    display: string;
    color: string;
  }[] = shiftBlocks.map((shiftBlock) => {
    if (shiftBlock.isOverlapShiftId !== undefined) {
      return {
        start:
          `${shiftBlock.startTime.getFullYear()}` +
          "-" +
          `${shiftBlock.startTime.getMonth() + 1}`.padStart(2, "0") +
          "-" +
          `${shiftBlock.startTime.getDate()}`.padStart(2, "0"),
        end:
          `${shiftBlock.endTime.getFullYear()}` +
          "-" +
          `${shiftBlock.endTime.getMonth() + 1}`.padStart(2, "0") +
          "-" +
          `${shiftBlock.endTime.getDate()}`.padStart(2, "0"),
        display: "background",
        color: "red",
      };
    } else {
      return {
        start: "",
        end: "",
        display: "",
        color: "",
      };
    }
  });

  return (
    <FullCalendar
      plugins={[dayGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="auto"
      locales={[jaLocale]}
      locale="ja"
      dateClick={(info) => {
        console.log(info.date); // 日付がクリックされたらコンソールに日付を表示
      }}
      dayCellContent={(info) => {
        return <div>{info.dayNumberText.replace("日", "")}</div>;
      }}
      dayMaxEvents={true}
      headerToolbar={{
        start: "",
        center: "title",
        end: "",
      }}
      events={[...events, ...backgroundEvents]}
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
  );
}

export default MonthlyCalender;
