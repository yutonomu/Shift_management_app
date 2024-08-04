import TimeLine from "./TimeLine";
import ShiftLine from "./ShiftLine";

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
    <>
      <h1>start body</h1>
      <div className="flex flex-row border border-green-950">
        <TimeLine />
        {shiftLines}
      </div>
      <h1>end body</h1>
    </>
  );
}

export default Body;
