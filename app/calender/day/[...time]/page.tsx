import React from "react";
import Calender from "@/app/pages/Calender";

const DayCalender = ({ params }: { params: { time: number } }) => {
  // Date型にすることで、あり得ない日付を入力された場合に自動的に補正してくれる
  const [year, month, day] = new Date(params.time)
    .toLocaleDateString()
    .split("/");
  // 以下のコードで、文字列を数値に変換できる
  // .map(Number);
  return (
    <div>
      <Calender year={year} month={month} day={day} />
    </div>
  );
};

export default DayCalender;
