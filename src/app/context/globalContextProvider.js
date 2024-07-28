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
  const [modal, setModal] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    if (user) getAllTask();
  }, [user]);

  const getAllTask = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      const sorted = res.data.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setTasks(sorted);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSumbit = async (e, task) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }
      toast.success("task Added");
      getAllTask();

      closeModal();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const getCompletedTask = () => {
    return tasks.filter((item) => item.isCompleted == true);
  };
  const getInCompletedTask = () => {
    return tasks.filter((item) => item.isCompleted == false);
  };
  const getImportantTask = () => {
    return tasks.filter((item) => item.isImportant == false);
  };
  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      const res = axios.delete(`/api/tasks/${id}`);
      let updatedata = [...tasks];
      updatedata = updatedata.filter((item) => item.id != id);
      setTasks(updatedata);
      toast.success("Task Deleted");
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const updateTask = async (task) => {
    try {
      const res = await axios.put("/api/tasks", task);
      const data = tasks.map((data) => {
        if (data.id == task.id) {
          data.isCompleted = task.isCompleted;
          return data;
        } else {
          return data;
        }
      });
      setTasks(data);
      toast.success("task updated");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <GlobalContext.Provider
      value={{
        theme: theme,
        tasks,
        deleteTask,
        getCompletedTask,
        getImportantTask,
        getInCompletedTask,
        updateTask,
        openModal,
        closeModal,
        handleOnSumbit,
        modal,
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
