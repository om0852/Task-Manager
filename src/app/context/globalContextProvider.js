"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const { user } = useUser();
  useEffect(() => {
    if (user) getAllTask();
  }, [user]);

  const getAllTask = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data.data);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const getCompletedTask=()=>{
    return tasks.filter((item)=>item.isCompleted==true);
  }
  const getInCompletedTask=()=>{
    return tasks.filter((item)=>item.isCompleted==false);
  }
  const getImportantTask=()=>{
    return tasks.filter((item)=>item.isImportant==false);
  }
  const deleteTask=async(id)=>{
try{
  setIsLoading(true);
const res = axios.delete(`/api/tasks/${id}`);
let updatedata=[...tasks]
updatedata=updatedata.filter((item)=>item.id!=id)
setTasks(updatedata)
toast.success("Task Deleted")

}
catch(error){
  
  toast.error("Something Went Wrong")

}
finally{
  setIsLoading(false)
}
  }
  return (
    <GlobalContext.Provider
      value={{
        theme: theme,
        tasks,
        deleteTask,
        getCompletedTask,
        getImportantTask,
        getInCompletedTask
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
