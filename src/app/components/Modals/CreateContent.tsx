"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import { plus } from "@/app/utils/Icons";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

const CreateContent = () => {
  const { theme, handleOnSumbit, updateData,updateTask } = useGlobalState();
  const [title, setTitle] = useState(updateData?.title || "");
  const [description, setDescription] = useState(updateData?.description || "");
  const [date, setDate] = useState(updateData?.date || "");
  const [completed, setCompleted] = useState(updateData?.isCompleted || false);
  const [important, setImportant] = useState(updateData?.isImportant || false);
  return (
    <CreateContentStyle
      theme={theme}
      onSubmit={(e) => {
        if(updateData==null){

          const task = {
            title,
            description,
            completed,
            important,
            date,
            state:updateData==null?"complete":"update"
          };
          handleOnSumbit(e, task);
        }
        else{
          const task = {
            title,
            description,
            completed,
            important,
            id:updateData.id,
            date,
            state:updateData==null?"complete":"update"
          };
          updateTask(e,task)
        }
      }}
    >
      <h1>{updateData != null ? "Update Task" : "Create a Task"}</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="e.g, Watch a movie or complete a project"
        />
      </div>
      <div className="input-control">
        <label htmlFor="Description">Description</label>
        <textarea
          id="Description"
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g, Watch a movie or complete a project"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          value={date}
          id="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="input-control   w-full h-[10vh] flex flex-row items-center justify-between">
        <label htmlFor="completed" style={{ marginBottom: 0 }}>
          Completed
        </label>
        <input
          style={{ width: "5vh" }}
          checked={completed}
          type="checkbox"
          value={completed.toString()}
          id="completed"
          name="completed"
          onChange={(e) => {
            setCompleted(e.target.checked);
          }}
        />
      </div>
      <div className="input-control w-full h-[10vh] flex flex-row items-center justify-between">
        <label htmlFor="Important mb-0" style={{ marginBottom: 0 }}>
          Important
        </label>
        <input
          style={{ width: "5vh" }}
          type="checkbox"
          checked={important}
          value={important.toString()}
          id="Important"
          className="w-4"
          name="Important"
          onChange={(e) => setImportant(e.target.checked)}
        />
      </div>
      <button
        type="submit"
        className="w-[30vh] h-14 font-semibold bg-green-600 gap-2 flex flex-row items-center justify-center hover:bg-purple-500 "
        style={{ borderRadius: "1vh" }}
      >
        {plus}
        <span>{updateData?.state=="update"?"Update":"Submit"}</span>
      </button>
    </CreateContentStyle>
  );
};

const CreateContentStyle = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    input,
    textarea {
      width: 100%;
      border: none;
      padding: 1rem;
      resize: none;
      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1); /* Inverts colors, making the icon visible */
    }
    label {
      color: white;
      margin-bottom: 1rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: white;
      }
    }
  }
`;

export default CreateContent;
