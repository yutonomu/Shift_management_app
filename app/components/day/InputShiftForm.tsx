import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Sheet,
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
  const [isSheetOpen, setIsSheetOpen] = useState(true); // シートの開閉状態を管理
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    selectedDevice: null,
    startTime: null,
    endTime: null,
  });
  const router = useRouter();

  // 選択されたデバイス名を保存するためのステートを定義;
  const [selectedDevice, setSelectedDevice] = useState<string | undefined>(
    defaultDeviceName
      ? deviceLabelMap[defaultDeviceName as keyof typeof deviceLabelMap]
      : undefined
  );

  const handleCreateShift = async (): Promise<boolean> => {
    console.log("onClicked");
    const validationResult = shiftFromSchema.safeParse({
      selectedDevice,
      startTime: startDateTime,
      endTime: endDateTime,
    });

    if (!validationResult.success) {
      const newErrors = validationResult.error.errors.reduce(
        (acc: any, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        },
        {}
      );
      setErrors(newErrors);
      return false; // バリデーションエラーが発生した場合、falseを返す
    }

    try {
      const newShift = await postShift({
        selectedDevice: validationResult.data.selectedDevice,
        startTime: validationResult.data.startTime,
        endTime: validationResult.data.endTime,
      });
      setErrors({ selectedDevice: null, startTime: null, endTime: null });
      router.refresh(); // ページをリフレッシュ
      console.log("Shift created successfully", newShift);
      setIsSheetOpen(false); // 成功した場合にシートを閉じる
      return true; // シフト作成が成功した場合、trueを返す
    } catch (error) {
      console.error("Error creating shift:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "シフトの作成中にエラーが発生しました。再度お試しください。",
      }));
      return false; // シフト作成に失敗した場合、falseを返す
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
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetHeader>
        <SheetTitle>
          {isEdit ? "シフトを編集します" : "シフトを登録します"}
        </SheetTitle>
        <SheetDescription>
          <div>
            {errors.startTime && (
              <div className="text-red-500 text-xs mt-2">
                {errors.startTime}
              </div>
            )}
            <SelectDateAndTime
              dateTime={startDateTime}
              setDateTime={setStartDateTime}
            />
          </div>
          {/* 開始時間を選択する */}
          <div>
            {errors.endTime && (
              <div className="text-red-500 text-xs mt-2">{errors.endTime}</div>
            )}
            <SelectDateAndTime
              dateTime={endDateTime}
              setDateTime={setEndDateTime}
            />
          </div>
          {/* 終了時間を選択する */}
          <div>
            {errors.selectedDevice && (
              <div className="text-red-500 text-xs mt-2">
                {errors.selectedDevice === "Required"
                  ? "デバイス名を選択してください"
                  : errors.selectedDevice}
              </div>
            )}
            <SelecteDevice
              deviceNames={deviceNames}
              defaultDeviceName={defaultDeviceName}
              setSelectedDevice={setSelectedDevice}
              setIsAllowInput={setIsAllowInput}
            />
          </div>
          {/* デバイス名を選択する */}
          <button
            className="rounded-md border border-black bg-white w-[50vw] h-[20vw] mt-4"
            onClick={async () => {
              const success = await handleCreateShift();
              console.log("success", success);
            }}
            type="submit"
            disabled={!isAllowInput}
          >
            <div className="text-base text-black">決定</div>
          </button>
          {isEdit && (
              <button
                className="rouded-md border border-black w-[50vw] h-[20vw] mt-4"
                disabled={!isAllowInput}
              >
                <div className="text-base">削除</div>
              </button>
          )}
        </SheetDescription>
      </SheetHeader>
    </Sheet>
  );
}

export default InputShiftForm;
