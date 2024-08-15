import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ToggleChoiceButton from "./ToggleChoiceButton";
import type { ShiftBlockType } from "@/app/types/ShiftBlockType";

interface AdminShiftBlockProps {
  userInput: ShiftBlockType;
  shiftBlocks: ShiftBlockType[];
  top: number;
  height: number;
  left: number;
  index: number;
}

function AdminShiftBlock({
  userInput,
  shiftBlocks,
  top,
  height,
  left,
  index,
}: AdminShiftBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const onConfirmClick = () => {
    console.log("決定", selectedId);
  };

  return (
    <Dialog>
      {userInput.isOverlapShiftId !== null ? (
        <DialogTrigger>
          <div
            key={index}
            className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black drop-shadow-md"
            style={{
              top: `${top}px`,
              height: `${height}px`,
              left: `${left}px`,
              backgroundColor: "red", // 背景色が赤の場合
            }}
          >
            {userInput.name}
          </div>
        </DialogTrigger>
      ) : (
        <div
          key={index}
          className="absolute w-full border-2 border-white bg-white rounded-xl text-center text-black drop-shadow-md"
          style={{
            top: `${top}px`,
            height: `${height}px`,
            left: `${left}px`,
            backgroundColor: userInput.color, // 背景色が赤でない場合
          }}
        >
          {userInput.name}
        </div>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>どちらのシフトを優先しますか？</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center w-full py-4">
          <ToggleChoiceButton
            shiftBlocks={shiftBlocks}
            myId={userInput.id}
            myName={userInput.name}
            myOverlapShiftId={userInput.isOverlapShiftId}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </div>
        <DialogFooter className="justify-start px-20">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-black hover:text-white border-2 border-black hover:border"
              onClick={onConfirmClick}
            >
              決定
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminShiftBlock;
