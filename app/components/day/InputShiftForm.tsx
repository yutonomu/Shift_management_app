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
import { postShift } from "@/app/actions/postShiftAction";
import { useRouter } from "next/navigation";
import { shiftFromSchema } from "@/app/types/ShiftFormSchema";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  // 選択されたデバイス名を保存するためのステートを定義;
  const [selectedDevice, setSelectedDevice] = useState<string | undefined>(
    defaultDeviceName
      ? deviceLabelMap[defaultDeviceName as keyof typeof deviceLabelMap]
      : undefined
  );

  const handleCreateShift = async () => {
    const validationResult = shiftFromSchema.safeParse({
      selectedDevice,
      startTime: startDateTime,
      endTime: endDateTime,
    });

    if (!validationResult.success) {
      // setErrorMessage("正しい入力を行ってください");
      confirm("正しい入力を行ってください");
      return;
    }

    try {
      const newShift = await postShift({
        selectedDevice: validationResult.data.selectedDevice,
        startTime: validationResult.data.startTime,
        endTime: validationResult.data.endTime,
      });
      setErrorMessage(null); // エラーがなければクリア
      router.refresh(); // ページをリフレッシュ
      console.log("Shift created successfully", newShift);
    } catch (error) {
      console.error("Error creating shift:", error);
      setErrorMessage("Error creating shift. Please try again.");
    }
  };

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
      newEndDateTime.setHours(startDateTime.getHours() + 1);
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
        <SheetTitle>シフトを登録します</SheetTitle>
        <SheetDescription>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
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
              className="rounded-md border border-black w-[50vw] h-[20vw] mt-4"
              onClick={async () => {
                await handleCreateShift();
              }}
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
