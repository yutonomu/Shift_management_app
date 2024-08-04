import TimeLine from "./TimeLine";
import ShiftLine from "./ShiftLine";

function Body() {
    const lineNum = 5
  const shiftLines = [...Array(lineNum)].map(() => {
    return (
        <>
            <div>
                <ShiftLine />
            </div>
        </>
    )
  })

  return (
    <>
      <h1>start body</h1>
      <TimeLine />
      {shiftLines}
      <h1>end body</h1>
    </>
  );
}

export default Body;
