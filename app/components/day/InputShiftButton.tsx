import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import InputShiftForm from "@/app/components/day/InputShiftForm";
import { PlusIcon } from "lucide-react";
import { NowPageTime } from "@/app/types/NowPageTime";

interface InputShiftButtonProps {
  deviceNames: string[];
  dateTime: Date;
  nowPageTime: NowPageTime;
}

function InputShiftButton({
  deviceNames,
  dateTime,
  nowPageTime,
}: InputShiftButtonProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <button className="rounded-[30%] lg:rounded-sm  bg-gray-300 w-12 lg:w-auto h-12 lg:pl-2 lg:pr-2 flex items-center justify-center drop-shadow-xl lg:drop-shadow-none lg:hover:bg-white">
          <PlusIcon className="lg:hidden text-black h-6 w-6" />
          新規シフト登録
        </button>
      </SheetTrigger>
      <SheetContent className="w-screen h-[80vh]" side={"bottom"}>
        <InputShiftForm
          deviceNames={deviceNames}
          dateTime={dateTime}
          nowPageTime={nowPageTime}
        />
      </SheetContent>
    </Sheet>
  );
}

export default InputShiftButton;
