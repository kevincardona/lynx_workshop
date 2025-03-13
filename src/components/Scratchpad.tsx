import { useState } from "@lynx-js/react";
import { useNavigate } from "react-router";
import "./Scratchpad.css"

export default function Scratchpad() {
  const nav = useNavigate()
 
  return (
    <view className="flex flex-col items-center justify-center h-full bg-white">
      <text className="text-black text-xl">nothing here yet...</text>
      <text className="text-black" bindtap={()=>nav('/')}>
        go back
      </text>
    </view>
  );
}
