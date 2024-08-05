import TimeLine from "@/app/components/day/TimeLine";
import ShiftLine from "@/app/components/day/ShiftLine";
import { ScrollArea } from "@/components/ui/scroll-area"

function Body() {
  const lineNum = 5;
  const shiftLines = [...Array(lineNum)].map((_, i) => {
    return (
      <>
        <div key={i} className="border border-yellow-300">
          <ShiftLine />
        </div>
      </>
    );
  });

  return (
    <div className="h-[80vh] bg-yellow-700">
      <ScrollArea className="h-[80vh] rounded-md border p-4">
        <div className="flex flex-row h-screen">
        <TimeLine />
        {shiftLines}
      </div>
      </ScrollArea>
    </div>
  );
}

export default Body;
