import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import SelecteDevice from "@/app/components/InputShiftForm/SelectDevice";
import SelectDateAndTime from "@/app/components/InputShiftForm/SelectDateAndTime";
import { Button  } from "@/components/ui/button";
import Link from "next/link";

interface InputShiftFormProps {
  deviceNames: string[];
  defaultDeviceName?: string | null;
}
function InputShiftForm({
  deviceNames,
  defaultDeviceName = null,
}: InputShiftFormProps) {
  const [startDateTime, setStartDateTime] = useState<Date | undefined>(
    undefined
  );
  const [endDateTime, setEndDateTime] = useState<Date | undefined>(new Date());

  useEffect(() => {
    // 開始時間が設定されたら終了時間を設定する. 終了時間は開始時間から1時間後に設定する
    if (startDateTime) {
      const newEndDateTime = new Date(startDateTime);
      newEndDateTime.setHours(startDateTime.getHours() + 1);
      setEndDateTime(newEndDateTime);
    }
    // 開始時間が設定されていない場合は、現在時刻の30分後に設定する
    else {
      const newStartDateTime = new Date();
      if (newStartDateTime.getMinutes() <= 30) {
        newStartDateTime.setMinutes(30);
      } else {
        newStartDateTime.setHours(newStartDateTime.getHours() + 1);
        newStartDateTime.setMinutes(0);
      }
      setStartDateTime(newStartDateTime);
    }
  }, [startDateTime]);

  return (
    <div>
      <SheetHeader>
        <SheetTitle>シフトを登録します</SheetTitle>
        <SheetDescription>
          <SelectDateAndTime
            dateTime={startDateTime}
            setDateTime={setStartDateTime}
          />{" "}
          {/* 開始時間を選択する */}
          <SelectDateAndTime
            dateTime={endDateTime}
            setDateTime={setEndDateTime}
          />{" "}
          {/* 終了時間を選択する */}
          <SelecteDevice
            deviceNames={deviceNames}
            defaultDeviceName={defaultDeviceName}
          /> {/* デバイス名を選択する */}
          <Button variant={"outline"} asChild className="border border-black w-[50vw] h-[20vw] mt-4">
            <Link href="/">
            <div
            className="text-base"
            >決定</div>
            </Link>
          </Button>
        </SheetDescription>
      </SheetHeader>
    </div>
  );
}

export default InputShiftForm;
