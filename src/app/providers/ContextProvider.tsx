
"use client";
import React, { useState } from 'react'
import { GlobalProvider } from '../context/globalContextProvider';
interface PropsType{
    children:React.ReactNode;
}

const ContextProvider:React.FC<PropsType> = ({children}) => {
const [isReady,setIsReady]=useState(false);
React.useEffect(()=>{
setTimeout(()=>{
    setIsReady(true);
},200);
},[])
if(!isReady){
    return <div className='w-full h-full flex items-center justify-center'><div className='loader'></div></div>;
}
  return (
    
    <GlobalProvider>{children}</GlobalProvider>
  )
}

export default ContextProvider