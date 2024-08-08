"use client";
import ShiftLine from "@/app/components/day/ShiftLine";
import { ScrollArea } from "@/components/ui/scroll-area";

function Body() {
  const deviceNum = 5;

  // 1:00 ~ 23:00 の文字列を作成
  const times: string[] = Array.from(
    { length: 23 },
    (_: unknown, i: number): string => `${i + 1}:00`
  );

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
        <div className="flex-grow border-t border-black"></div>{" "}
        {/* 時刻の横に引く線 */}
      </div>
    );
  };

  // 時刻と横線の背景を作成
  const timeLines = (
    // <div className="flex">
    <div className="w-[100vw] absolute z-10">
      {times.map((time: string, index: number) => (
        <div key={index}>{timeWithLine(time, index)}</div> // 時刻と横線を表示
      ))}
    </div>
    // </div>
  );

  // 各ShiftLineを作成
  const shiftLines = [...Array(deviceNum)].map((_, i) => {
    return (
      <div key={i} className="w-[16vw] h-full flex-none z-20">
        <ShiftLine />
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
