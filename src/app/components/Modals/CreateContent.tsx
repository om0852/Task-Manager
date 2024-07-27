"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  // useEffect(()=>{

  // },[title])
  const handleOnSumbit = async (e: FormEvent) => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed,
      important,
      date,
    };
    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }
      toast.success("task Added");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div>
      <h1>Create a Task</h1>
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

      <div className="input-control">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          value={completed.toString()}
          id="completed"
          name="completed"
          onChange={(e) => setCompleted(e.target.value === "true")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="Important">Important</label>
        <input
          type="checkbox"
          value={important.toString()}
          id="Important"
          name="Important"
          onChange={(e) => setImportant(e.target.value === "true")}
        />
      </div>
      <button onClick={handleOnSumbit}>Submit</button>
    </div>
  );
};

export default CreateContent;
