import Image from "next/image";
import { DatePicker } from "./DatePicker";
import TimePicker from "./TimePicker";

interface SelectDateAndTimeProps {
  dateTime: Date | undefined;
  setDateTime: (date: Date | undefined) => void;
}

function SelectDateAndTime({
  dateTime,
  setDateTime,
}: SelectDateAndTimeProps): JSX.Element {

  return (
    <div className="flex justify-between items-center border-b border-black m-3">
      <Image
        src="/Icons/uil_calender.svg"
        alt="calender"
        width={100}
        height={100}
      />
      <DatePicker date={dateTime} setDate={setDateTime} />
      <TimePicker date={dateTime} setDate={setDateTime} />
    </div>
  );
}

export default SelectDateAndTime;
