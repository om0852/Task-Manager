"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../taskitem/TaskItem";
import { plus } from "@/app/utils/Icons";
interface TaskProps {
  title: string;
  tasks: any[];
}
const Tasks: React.FC<TaskProps> = ({ title, tasks }) => {
  const { theme } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      {/* <CreateContent/> */}
      <h1>{title}</h1>
      <div className="tasks grid">
        {tasks?.map((item, index) => (
          <TaskItem
            key={index}
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            isCompleted={item.isCompleted}
            isImportant={item.isImportant}
          />
        ))}
        <button className="create-task">{plus}Add New task</button>
      </div>
    </TaskStyled>
  );
};

const TaskStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  padding: 2rem;
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 100%;
  border-radius: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  .tasks{
    margin: 4vh 0;
  }
  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 500;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }
  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGray2};
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
  .task{

  }
`;
export default Tasks;
