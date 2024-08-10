import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import InputShiftForm from "@/app/components/day/InputShiftForm";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

function InputShiftButton() {
  return (
    // <Sheet>
    //   <SheetTrigger>
    //     <button className="rounded-[30%] bg-gray-300 w-12 h-12 flex items-center justify-center drop-shadow-xl">
    //       <PlusIcon className="text-black h-6 w-6" />
    //     </button>
    //   </SheetTrigger>
    //   <SheetContent className="w-screen h-screen" side={"bottom"}>
    //     <InputShiftForm />
    //   </SheetContent>
    // </Sheet>
    <Link
      href={"inputShiftForm/create"}
      className="rounded-[30%] bg-gray-300 w-12 h-12 flex items-center justify-center drop-shadow-xl"
    >
      <PlusIcon className="text-black h-6 w-6" />
    </Link>
  );
}

export default InputShiftButton;
