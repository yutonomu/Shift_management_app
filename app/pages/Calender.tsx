"use Client";
import Day from "./Day";
import SettingsButton from "../components/calender/SettingsButton";

function Calender() {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute z-10">
        <Day />
      </div>
      <div className="absolute z-20">
        <SettingsButton />
      </div>
    </div>
  );
}

export default Calender;
