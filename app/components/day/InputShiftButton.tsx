import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import InputShiftForm from "@/app/components/day/InputShiftForm";
import { Button } from "@/components/ui/button";
import { Plus, PlusIcon } from "lucide-react";

function InputShiftButton() {
  return (
    <Sheet>
      <SheetTrigger>
        {/* デザイン案1 */}
        {/* <button className="inline-flex items-center justify-center rounded-full bg-primary p-4 text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <PlusIcon className="h-6 w-6" />
        </button> */}

        {/* デザイン案2 */}
        <button className="rounded-full bg-white border border-black w-12 h-12 flex items-center justify-center">
          <PlusIcon className="text-black h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-screen h-screen" side={"bottom"}>
        <InputShiftForm />
      </SheetContent>
    </Sheet>
  );
}

export default InputShiftButton;
