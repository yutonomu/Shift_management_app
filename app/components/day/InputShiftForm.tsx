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
import { postShift } from "@/app/actions/postShiftAction";
import { useRouter } from "next/navigation";
import { shiftFromSchema } from "@/app/types/ShiftFormSchema";
import { editShift } from "@/app/actions/editShiftAction";
import { deleteShift } from "@/app/actions/deleteShiftAction";
import { NowPageTime } from "@/app/types/NowPageTime";

interface InputShiftFormProps {
  id?: string | null;
  userId?: string | null;
  deviceNames: string[];
  defaultDeviceName?: string | null;
  dateTime: Date;
  start?: Date;
  end?: Date;
  isEdit?: boolean;
  nowPageTime: NowPageTime;
}

function InputShiftForm({
  id,
  userId,
  deviceNames,
  defaultDeviceName = null,
  dateTime,
  start,
  end,
  isEdit = false,
  nowPageTime,
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
    defaultDeviceName ? defaultDeviceName : undefined
  );

  const handleCreateShift = async (): Promise<boolean> => {
    console.log("handleCreateShift.selectedDevice", selectedDevice);
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
      router.push(
        `/calender/day/${nowPageTime.year}/${nowPageTime.month}/${nowPageTime.day}`
      ); // ページをリフレッシュ
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

  const handleDeleteShift = async (): Promise<boolean> => {
    try {
      const deletedShift = await deleteShift({
        shiftId: id as string,
      });
      router.push(
        `/calender/day/${nowPageTime.year}/${nowPageTime.month}/${nowPageTime.day}`
      ); // ページをリフレッシュ
      console.log("Shift edited successfully", deletedShift);
      setIsSheetOpen(false); // 成功した場合にシートを閉じる
      return true; // シフトの削除が成功した場合、trueを返す
    } catch (error) {
      console.error("Error creating shift:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "シフトの削除中にエラーが発生しました。再度お試しください。",
      }));
      return false; // シフトの削除に失敗した場合、falseを返す
    }
  };

  const handleEditShift = async (): Promise<boolean> => {
    console.log("handleEditShift.selectedDevice", selectedDevice);
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
      const fixShift = await editShift({
        shiftId: id as string,
        userId: userId as string,
        selectedDevice: validationResult.data.selectedDevice,
        startTime: validationResult.data.startTime,
        endTime: validationResult.data.endTime,
      });
      setErrors({ selectedDevice: null, startTime: null, endTime: null });
      router.push(
        `/calender/day/${nowPageTime.year}/${nowPageTime.month}/${nowPageTime.day}`
      ); // ページをリフレッシュ
      console.log("Shift edited successfully", fixShift);
      setIsSheetOpen(false); // 成功した場合にシートを閉じる
      return true; // シフトの編集が成功した場合、trueを返す
    } catch (error) {
      console.error("Error creating shift:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "シフトの作成中にエラーが発生しました。再度お試しください。",
      }));
      return false; // シフト編集に失敗した場合、falseを返す
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
          <div className="flex justify-center items-center">
            <div className="flex flex-row space-x-4">
              <button
                className="rounded-md border border-black bg-white w-[30vw] h-[15vw] mt-4"
                onClick={async () => {
                  if (isEdit) {
                    const success = await handleEditShift();
                    console.log("edit success", success);
                  } else {
                    const success = await handleCreateShift();
                    console.log("create success", success);
                  }
                }}
                type="submit"
                disabled={!isAllowInput}
              >
                <div className="text-base text-black">
                  {isEdit ? "編集" : "決定"}
                </div>
              </button>
              {isEdit && (
                <button
                  className="rounded-md border border-black w-[30vw] h-[15vw] mt-4"
                  onClick={async () => {
                    const success = await handleDeleteShift();
                    console.log("delete success", success);
                  }}
                  disabled={!isAllowInput}
                >
                  <div className="text-base text-red-500">削除</div>
                </button>
              )}
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </Sheet>
  );
}

export default InputShiftForm;
