"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import { edit, trash } from "@/app/utils/Icons";
import formatDate from "@/app/utils/formatdate";
import React, { useMemo } from "react";
import styled from "styled-components";
interface Props {
  id:string;
  title: string;
  description: string;
  date: string;
  isImportant: boolean;
  isCompleted: boolean;
}
const TaskItem: React.FC<Props> = ({
  title,
  id,
  description,
  date,
  isImportant,
  isCompleted,
}) => {
  const { theme ,updateTask,deleteTask} = useGlobalState();
  const  newDate = useMemo(() => formatDate(date), []);

  
  return (
    <TaskItemStyle theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{newDate}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button onClick={()=>{const obj={id,isCompleted:false};updateTask(obj)}} className="completed">Completed</button>
        ) : (
          <button onClick={()=>{const obj={id,isCompleted:true};updateTask(obj)}} className="incompleted">InCompleted</button>
        )}
        <div>
          <button className="edit">{edit}</button>
          <button className="edit" onClick={()=>deleteTask(id)} >{trash}</button>
        </div>
      </div>
    </TaskItemStyle>
  );
};

const TaskItemStyle = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }
  > h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .task-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        margin: 0 2vh;
        color: ${(props) => props.theme.colorGrey2};
        font-size: 1.4rem;
      }
    }
    .edit {
      margin-left: auto;
    }
    .completed,
    .incompleted {
      display: inline-block;

      padding: 0.4rem 1rem;
      background-color: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }
    .completed {
      background-color: ${(props) => props.theme.colorGreenDark};
    }
  }
`;
export default TaskItem;
