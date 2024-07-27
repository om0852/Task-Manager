"use client"
import React from 'react'
import Tasks from '../components/tasks/Tasks'
import { useGlobalState } from '../context/globalContextProvider'

const page = () => {
  const {getInCompletedTask}= useGlobalState();
  return <Tasks title='Do It Now Tasks' tasks={getInCompletedTask()}/>
}

export default page