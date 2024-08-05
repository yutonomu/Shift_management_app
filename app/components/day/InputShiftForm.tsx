import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

function InputShiftForm() {
  return (
    <div>
      <SheetHeader>
        <SheetTitle>シフトを登録します</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </div>
  );
}

export default InputShiftForm;
