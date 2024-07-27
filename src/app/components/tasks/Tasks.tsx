"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";

const Tasks = () => {
  const { theme } = useGlobalState();
  return <TaskStyled theme={theme}><CreateContent/></TaskStyled>;
};

const TaskStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  padding: 2rem;
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 100%;
  border-radius: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0.5rem;
  }
`;
export default Tasks;
