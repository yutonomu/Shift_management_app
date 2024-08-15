import { ShiftBlockType } from "@/app/types/ShiftBlockType";
import React, { useState } from "react";

interface ToggleChoiceButtonProps {
  shiftBlocks: ShiftBlockType[];
  myId: string;
  myName: string;
  myOverlapShiftId: string | null;
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}

function ToggleChoiceButton({
  shiftBlocks,
  myId,
  myName,
  myOverlapShiftId,
  selectedId,
  setSelectedId,
}: ToggleChoiceButtonProps) {
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
}

// シフト採択ポップアップ用のカスタムボタン
type CustomButtonProps = {
  id: string;
  label: string;
  // setSelectedId: (id: string) => void;
  isSelected: boolean;
  onClick: () => void;
};
const CustomButton = ({ label, isSelected, onClick }: CustomButtonProps) => {
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

export default ToggleChoiceButton;
