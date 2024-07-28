"use client"
import Image from "next/image";
import Tasks from "./components/tasks/Tasks";
import { useGlobalState } from "./context/globalContextProvider";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const {tasks}=useGlobalState();
  const router =useRouter();
  const { user } = useUser();
  console.log(user)
  useEffect(()=>{
if(!user){
router.push("/signup")
}
  },[])
  return <Tasks tasks={tasks} title="All Tasks" />;
}
