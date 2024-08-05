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
import { ChevronRight } from "lucide-react";
import {Plus} from "lucide-react";

function InputShiftButton() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-screen h-screen" side={"bottom"}>
        <InputShiftForm />
      </SheetContent>
    </Sheet>
  );
}

export default InputShiftButton;
