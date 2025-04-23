import { ChangeEvent, useState } from "react";

export function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  return `${year}-${month}-${date}T${hours}:${minutes}`;
}

export function useCurrentTime() {
  const [time, setTime] = useState("");

  const updateCurrentTime = () => {
    setTime(getCurrentTime());
  };

  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return { time, handleTime, updateCurrentTime };
}
