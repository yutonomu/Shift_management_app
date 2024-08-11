import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import SelecteDevice from "@/app/components/InputShiftForm/SelectDevice";
import SelectDateAndTime from "@/app/components/InputShiftForm/SelectDateAndTime";
import { deviceLabelMap } from "@/app/types/devices";

interface InputShiftFormProps {
  deviceNames: string[];
  defaultDeviceName?: string | null;
  dateTime: Date;
}
function InputShiftForm({
  deviceNames,
  defaultDeviceName = null,
  dateTime,
}: InputShiftFormProps) {
  const [startDateTime, setStartDateTime] = useState<Date | undefined>(
    undefined
  );
  const [endDateTime, setEndDateTime] = useState<Date | undefined>(new Date());
  const [isAllowInput, setIsAllowInput] = useState<boolean>(true);

  // 選択されたデバイス名を保存するためのステートを定義;
  const [selectedDevice, setSelectedDevice] = useState<string | undefined>(
    defaultDeviceName
      ? deviceLabelMap[defaultDeviceName as keyof typeof deviceLabelMap]
      : undefined
  );

  useEffect(() => {
    if (selectedDevice) {
      setTimeout(() => {
        setIsAllowInput(true);
      }, 300); // 300msの遅延を設定
    }
  }, [selectedDevice]);

  useEffect(() => {
    // 開始時間が設定されたら終了時間を設定する. 終了時間は開始時間から1時間後に設定する
    if (startDateTime) {
      const newEndDateTime = new Date(startDateTime);
      newEndDateTime.setHours(startDateTime.getHours() + 1);
      setEndDateTime(newEndDateTime);
    }
    // 開始時間が設定されていない場合は、現在時刻の30分後に設定する
    else {
      const newStartDateTime = new Date(dateTime); // 親コンポーネントから渡された日付を開始時間に設定する
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
            setSelectedDevice={setSelectedDevice}
            setIsAllowInput={setIsAllowInput}
          />{" "}
          {/* デバイス名を選択する */}
          <SheetClose asChild>
            <button
              className="rouded-md border border-black w-[50vw] h-[20vw] mt-4"
              disabled={!isAllowInput}
            >
              <div className="text-base">決定</div>
            </button>
          </SheetClose>
        </SheetDescription>
      </SheetHeader>
    </div>
  );
}

export default InputShiftForm;
