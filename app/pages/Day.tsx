"use Client";
import Header from "../components/day/Header";
import Body from "../components/day/Body";
import InputShiftButton from "../components/day/InputShiftButton";

function Day() {
  return (
    <div className="relative w-screen h-screen bg-gray-300">
      <Header />
      <div className="absolute z-10">
        <Body />
      </div>
      <div className="absolute z-20 right-0 bottom-0">
        <InputShiftButton />
      </div>
    </div>
  );
}

export default Day;
