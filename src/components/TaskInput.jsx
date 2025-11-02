"use client";
import { useState, useRef } from "react";
import { useTask } from "@/context/TaskContext";
import { useToaster } from "@/context/ToasterContext";
import { useThemeContext } from "@/context/ThemeContext";

export const TaskInput = () => {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);
  const { addTask } = useTask();
  const { showToast } = useToaster();
  const { theme } = useThemeContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter a task title.", "error");
      return;
    }
    addTask(title);
    showToast("Task added successfully!", "success");
    setTitle("");
    inputRef.current.focus();
  };

  return (
    <section
      className="w-full max-w-2xl mx-auto mt-16 md:mt-28 p-6 text-green-950 md:rounded-2xl md:bg-white md:border md:border-gray-200 md:shadow-md dark:md:bg-[#121212] dark:md:border-gray-700 dark:text-green-100"
    >
      <h2 className="text-2xl font-bold text-center mb-2">Plan Your Day with Ease</h2>
      <p className="text-center text-gray-500 mb-6">
        Add, track, and complete your daily tasks effortlessly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-3 flex-col md:flex-row"
      >
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task..."
          className={`w-full md:w-fit md:flex-1 px-4 py-3 rounded-xl outline-none text-base transition-all duration-300
            ${theme === "dark"
              ? "bg-[#1e1e1e] border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-green-500"
              : "bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-green-600"}`}
        />

        <button
          type="submit"
          className={`w-full md:w-fit px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer 
            ${theme === "dark"
              ? "bg-green-500 text-black hover:bg-green-400"
              : "bg-green-600 text-white hover:bg-green-500"}`}
        >
          Add
        </button>
      </form>
    </section>
  );
};
