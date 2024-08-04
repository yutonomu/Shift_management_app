"use Client";
import Header from "../components/day/Header";
import Body from "../components/day/Body";
import InputShiftButton from "../components/day/InputShiftButton";

function Day() {
  return (
    <>
    <div className="border border-green-900">

      <Header />
      <Body />
      <InputShiftButton />
    </div>
    </>
  );
}

export default Day;
