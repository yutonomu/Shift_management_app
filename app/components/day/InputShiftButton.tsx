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
        <button className="rounded-[30%] bg-gray-300 w-12 h-12 flex items-center justify-center drop-shadow-xl">
          <PlusIcon className="text-black h-6 w-6" />
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
