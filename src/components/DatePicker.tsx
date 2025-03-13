import { useState } from "@lynx-js/react";
import { useNavigate } from "react-router";
import "./Scratchpad.css"

export default function DatePicker() {
  const nav = useNavigate()
  const [date, setDate] = useState<string>("")

  const handleDateChange = (e: ReactLynx.XInputEvent) => {
    const newDate = e.detail.value;
    setDate(new Date(newDate).toISOString());
    console.log("Date changed to:", newDate);
  };

  return (
    <view className="flex flex-col items-center justify-center h-full bg-white">
      <text className="text-black">{date || "nothing changed yet"}</text>
      <date-picker className="date-picker" value={date} bindinput={handleDateChange}/>
      <text className="text-black" bindtap={()=>nav('/')}>
        go back
      </text>
    </view>
  );
}

