import TimeLine from "@/app/components/day/TimeLine";
import ShiftLine from "@/app/components/day/ShiftLine";
import { ScrollArea } from "@/components/ui/scroll-area";

function Body() {
  const lineNum = 5;
  const shiftLines = [...Array(lineNum)].map((_, i) => {
    return (
      <>
        <div key={i} className="w-[15vw]">
          <ShiftLine />
        </div>
      </>
    );
  });

  return (
    <div className="h-full bg-yellow-700">
      <ScrollArea className="w-screen h-[80vh] rounded-md border">
        <div className="flex flex-row ">
          <div className="w-[20vw]">
            <TimeLine />
          </div>
          {shiftLines}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Body;
