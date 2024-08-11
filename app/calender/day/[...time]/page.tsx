import React from "react";
import Calender from "@/app/pages/Calender";
import { type } from "os";

const DayCalender = ({ params }: { params: { time: number } }) => {
  // Date型にすることで、あり得ない日付を入力された場合に自動的に補正してくれる
  const date = new Date(params.time);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  return (
    <div>
      <Calender year={year} month={month} day={day} />
    </div>
  );
};

export default DayCalender;
