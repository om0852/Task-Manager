"use client"
import Image from "next/image";
import Tasks from "./components/tasks/Tasks";
import { useGlobalState } from "./context/globalContextProvider";

export default function Home() {
  const {tasks}=useGlobalState();
  return <Tasks tasks={tasks} title="All Tasks" />;
}
