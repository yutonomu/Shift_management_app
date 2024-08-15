import type { ShiftBlockType } from "@/app/types/ShiftBlockType";
import InputShiftForm from "./InputShiftForm";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { NowPageTime } from "@/app/types/NowPageTime";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { useState } from "react";
import { Role } from "@prisma/client";

interface ShiftLineProps {
  deviceNames: string[];
  deviceName: string;
  shiftBlocks: ShiftBlockType[];
  calcBlockPosition: (
    startTime: Date,
    endTime: Date
  ) => { top: number; left: number; height: number };
  nowPageTime: NowPageTime;
}

function ShiftLine({
  deviceNames,
  deviceName,
  shiftBlocks,
  calcBlockPosition,
  nowPageTime,
}: ShiftLineProps) {
  const role = "ADMIN" as Role;

  // カスタムボタン
  type CustomButtonProps = {
    id: string;
    label: string;
    // setSelectedId: (id: string) => void;
    isSelected: boolean;
    onClick: () => void;
  };
  const CustomButton = ({
    id,
    label,
    isSelected,
    onClick,
  }: CustomButtonProps) => {
    return (
      <button
        className={`${isSelected ? "bg-black" : "bg-white"}  ${
          isSelected ? "text-white" : "text-black"
        } border border-black px-4 py-2 rounded-md`}
        onClick={() => onClick()}
      >
        {label}
      </button>
    );
  };

  const ChoiceShift = (
    myId: string,
    myName: string,
    myOverlapShiftId: string | null
  ) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const handleClick = (shiftBlockId: string) => {
      setSelectedId(shiftBlockId);
    };

    return (
      <div className="grid grid-cols-2 gap-2">
        <CustomButton
          id={myId}
          label={myName}
          isSelected={selectedId === myId}
          onClick={() => handleClick(myId)}
        />
        <CustomButton
          id={myOverlapShiftId}
          label={
            // 重複しているシフトの名前を表示
            shiftBlocks.map((other: ShiftBlockType, index: number) => {
              return myOverlapShiftId === other.id && other.name;
            })
          }
          isSelected={selectedId === myOverlapShiftId}
          onClick={() => handleClick(myOverlapShiftId)}
        />
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col relative">
      {/* ShiftLineの仕切り線 */}

      {shiftBlocks.map((userInput: ShiftBlockType, index: number) => {
        const { top, left, height } = calcBlockPosition(
          userInput.startTime,
          userInput.endTime
        );
        console.log("userInput.selectedDevice: ", userInput.isOverlapShiftId);

        return (
          userInput.selectedDevice === deviceName &&
          (role === "USER" ? (
            <Sheet>
              <SheetTrigger>
                <div
                  key={index}
                  className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${left}px`,
                    backgroundColor:
                      userInput.isOverlapShiftId !== null
                        ? "red"
                        : userInput.color,
                  }}
                >
                  {userInput.name}
                </div>
              </SheetTrigger>
              <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
                <InputShiftForm
                  id={userInput.id}
                  userId={userInput.userId}
                  deviceNames={deviceNames}
                  dateTime={userInput.startTime}
                  start={userInput.startTime}
                  end={userInput.endTime}
                  defaultDeviceName={userInput.selectedDevice}
                  isEdit={true}
                  nowPageTime={nowPageTime}
                />
              </SheetContent>
            </Sheet>
          ) : (
            <Dialog>
              <DialogTrigger>
                <div
                  key={index}
                  className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black drop-shadow-md"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${left}px`,
                    backgroundColor:
                      userInput.isOverlapShiftId !== null
                        ? "red"
                        : userInput.color,
                  }}
                >
                  {userInput.name}
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>どちらのシフトを優先しますか？</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center w-full py-4">
                  {ChoiceShift(
                    userInput.id,
                    userInput.name,
                    userInput.isOverlapShiftId
                  )}
                </div>
                <DialogFooter className="justify-start px-20">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="default"
                      className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-black hover:text-white border-2 border-black hover:border"
                    >
                      決定
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))
        );
      })}
    </div>
  );
}

export default ShiftLine;
