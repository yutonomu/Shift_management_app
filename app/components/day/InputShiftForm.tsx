import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { DatePicker } from "@/app/components/InputShiftForm/DatePicker";

import TimePicker from "../InputShiftForm/TimePicker";
import { useState } from "react";

interface InputShiftFormProps {
  deviceNames: string[];
  defaultDeviceName?: string | null;
}

function InputShiftForm({
  deviceNames,
  defaultDeviceName = null,
}: InputShiftFormProps) {

  function SelectStartDateAndTime(): JSX.Element {
    const [time, setTime] = useState<Date | undefined>(new Date());

    return (
      <div className="flex justify-between items-center border-b border-black m-3">
        <Image
          src="/Icons/uil_calender.svg"
          alt="calender"
          width={100}
          height={100}
        />
        <DatePicker />
        <TimePicker date={time} setDate={setTime} />
      </div>
    );
  }

  function SelecteDevice(): JSX.Element {
    {
      const selectContents = () => {
        return (
          <div>
            {deviceNames.map((deviceName) => (
              <SelectItem key={deviceName} value={deviceName}>
                {deviceName}
              </SelectItem>
            ))}
          </div>
        );
      };
      const placeholder: string = defaultDeviceName
        ? defaultDeviceName
        : "デバイス名を選択";
      return (
        <div className="flex justify-between items-center m-3">
          <Image
            src="/Icons/bi_pc-display-horizontal.svg"
            alt="device"
            width={100}
            height={100}
          />
          <Select>
            <SelectTrigger className="w-[50vw]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>{selectContents()}</SelectContent>
          </Select>
        </div>
      );
    }
  }

  return (
    <div>
      <SheetHeader>
        <SheetTitle>シフトを登録します</SheetTitle>
        <SheetDescription>
          <SelectStartDateAndTime /> {/* 開始時間を選択する */}
          <SelecteDevice /> {/* デバイス名を選択する */}
        </SheetDescription>
      </SheetHeader>
    </div>
  );
}

export default InputShiftForm;
