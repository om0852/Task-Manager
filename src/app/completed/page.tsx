"use client"
import React from 'react'
import Tasks from '../components/tasks/Tasks'
import { useGlobalState } from '../context/globalContextProvider'

const Page = () => {
  const {getCompletedTask}= useGlobalState();
  return <Tasks title='Important Tasks' tasks={getCompletedTask()}/>
}

export default Page