"use client"
import React from 'react'
import Tasks from '../components/tasks/Tasks'
import { useGlobalState } from '../context/globalContextProvider'

const page = () => {
  const {getImportantTask}= useGlobalState();
  return <Tasks title='Important Tasks' tasks={getImportantTask()}/>
}

export default page