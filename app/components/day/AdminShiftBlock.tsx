import React, { useEffect, useState } from "react";
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
import { SelectedIdType } from "@/app/types/SelectedIdType";
import { z } from "zod";
import { overlapUpdateShift } from "@/app/actions/overlapUpdateShiftAction";

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
  const [selectedIdList, setSelectedIdList] = useState<SelectedIdType[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // selectedIdListの初期化
  useEffect(() => {
    const initialSelectedId = userInput.isOverlapShiftId.map((overlapId) => {
      return { [userInput.id]: false, [overlapId]: false };
    }); // userInputのisOverlapShiftIdの要素数分のオブジェクトを作成. それぞれのkeyはuserInput.idとisOverlapShiftIdの要素
    setSelectedIdList(initialSelectedId);
  }, [userInput.id, userInput.isOverlapShiftId]);

  // 決定ボタンがクリックされた時の処理
  const onConfirmClick = async () => {
    console.log("決定", selectedIdList);
    const results = selectedIdList.map((item, index) => {
      const selectedId = Object.keys(item).find((key) => item[key] === true); // 選択されたシフトのID
      const unSelectedId = Object.keys(item).find((key) => item[key] === false); // 選択されなかったシフトのID
      return {
        // 選択されたシフトのIDと同じIDを持つshiftBlocksの要素をselectの値にする
        select: shiftBlocks.find((block) => block.id === selectedId),
        // 選択されなかったシフトのIDと同じIDを持つshiftBlocksの要素をunSelectの値にする
        unSelect: shiftBlocks.find((block) => block.id === unSelectedId),
      };
    });
    // Zodバリデーションスキーマ
    const ResultsSchema = z.array(
      z.object({
        select: z
          .object({
            id: z.string(),
          })
          .nullable(), // nullableにしておくことで、バリデーションの際にnullかどうかをチェック
        unSelect: z
          .object({
            id: z.string(),
          })
          .nullable(),
      })
    );

    const validation = ResultsSchema.safeParse(results);

    if (!validation.success) {
      alert("選択されていない項目があります");
    } else {
      const updatedShift = await overlapUpdateShift({
        results: results,
      });
      setIsSheetOpen(false);
      console.log("results: ", results);
      return updatedShift;
    }
  };

  return (
    <Dialog open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {userInput.isOverlapShiftId.length > 0 ? (
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
            selectedIdList={selectedIdList}
            setSelectedIdList={setSelectedIdList}
          />
        </div>
        <DialogFooter className="justify-start px-20">
          <Button
            type="button"
            variant="default"
            className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-black hover:text-white border-2 border-black hover:border"
            onClick={onConfirmClick}
          >
            決定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminShiftBlock;
