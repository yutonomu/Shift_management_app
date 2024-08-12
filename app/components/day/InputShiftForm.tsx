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
  start?: Date;
  end?: Date;
  isEdit?: boolean;
}
function InputShiftForm({
  deviceNames,
  defaultDeviceName = null,
  dateTime,
  start,
  end,
  isEdit = false,
}: InputShiftFormProps) {
  const [startDateTime, setStartDateTime] = useState<Date | undefined>(
    start ? start : undefined
  );
  const [endDateTime, setEndDateTime] = useState<Date | undefined>(
    end ? end : new Date()
  );
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
    if (startDateTime !== undefined) {
      const newEndDateTime = new Date(startDateTime);
      if (!isEdit) {
        newEndDateTime.setHours(startDateTime.getHours() + 1);
      } else if (endDateTime) {
        newEndDateTime.setHours(endDateTime.getHours());
        newEndDateTime.setMinutes(endDateTime.getMinutes());
      }
      setEndDateTime(newEndDateTime);
    }
    // 開始時間が設定されていない場合は、現在時刻の30分後に設定する
    else {
      const now = new Date(); // 現在時刻を設定する用
      const newStartDateTime = new Date(dateTime); // 親コンポーネントから渡された日付を開始時間に設定する
      if (now.getMinutes() <= 30) {
        newStartDateTime.setHours(now.getHours());
        newStartDateTime.setMinutes(30);
      } else {
        newStartDateTime.setHours(now.getHours() + 1);
        newStartDateTime.setMinutes(0);
      }
      setStartDateTime(newStartDateTime);
    }
  }, [startDateTime]);

  return (
    <div>
      <SheetHeader>
        <SheetTitle>
          {isEdit ? "シフトを編集します" : "シフトを登録します"}
        </SheetTitle>
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
          {isEdit && (
            <SheetClose asChild>
              <button
                className="rouded-md border border-black w-[50vw] h-[20vw] mt-4"
                disabled={!isAllowInput}
              >
                <div className="text-base">削除</div>
              </button>
            </SheetClose>
          )}
        </SheetDescription>
      </SheetHeader>
    </div>
  );
}

export default InputShiftForm;
