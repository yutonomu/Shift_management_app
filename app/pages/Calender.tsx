"use Client";
import Day from "./Day";
import SettingsButton from "../components/calender/SettingsButton";

function Calender() {
  return (
    <>
      <div className="border-2 border-green-500">
        <h1 className="text-green-500">calender</h1>
        <SettingsButton />
        <Day />
      </div>
    </>
  );
}

export default Calender;
