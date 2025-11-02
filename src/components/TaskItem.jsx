import { useEffect, useRef, useState } from "react";
import { useTask } from "@/context/TaskContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useToaster } from "@/context/ToasterContext";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask, editTask } = useTask();
  const { showToast } = useToaster();
  const { theme } = useThemeContext();

  const itemRef = useRef(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  // Handlers
  const handleDelete = () => {
    deleteTask(task.id);
    showToast("Task deleted", "error");
  };

  const handleEdit = () => {
    if (!newTitle.trim()) {
      showToast("Task title cannot be empty", "error");
      return;
    }
    editTask(task.id, newTitle);
    setIsEditing(false);
    showToast("Task updated", "success");
  };

  const handleCheckbox = () => {
    toggleTask(task.id);
    showToast(task.isDone ? "Marked incomplete" : "Task completed!", "info");
  };

  // Effects
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !itemRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync newTitle with task title on task change
  useEffect(() => {
    setNewTitle(task.title);
  }, [task.title]);

  return (
    <div
      ref={itemRef}
      className={`flex flex-row items-center justify-between gap-3 p-4 rounded-xl border border-gray-700
        ${theme === "dark"
          ? "bg-[#1e1e1e] text-gray-100"
          : "bg-white text-gray-800 shadow-sm"
        }`}
    >
      {/* Left: Checkbox + Text */}
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={handleCheckbox}
          className="w-5 h-5 accent-green-500 cursor-pointer"
        />

        {isEditing ? (
          <input
            type="text"
            ref={inputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className={`px-3 py-1 rounded-lg text-sm outline-none w-full
              ${theme === "dark"
                ? "bg-[#121212] border border-gray-700 text-gray-100"
                : "bg-gray-50 border border-gray-700 text-gray-800"
              }`}
          />
        ) : (
          <div className="flex flex-col w-full overflow-hidden">
            <p
              className={`text-base font-medium ${task.isDone ? "line-through opacity-60" : ""
                }`}
            >
              {task.title}
            </p>
            <span className="text-xs text-gray-500">
              Updated on {task.updatedAt}
            </span>
          </div>
        )}
      </div>

      {/* Right: Menu */}
      <div ref={menuRef} className="relative self-auto">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
        >
          <FiMoreVertical size={18} />
        </button>

        {menuOpen && (
          <div
            className={`absolute right-0 top-10 rounded-lg shadow-lg border border-gray-700 z-50 w-32
              ${theme === "dark"
                ? "bg-[#1e1e1e] text-gray-100"
                : "bg-white text-gray-800"
              }`}
          >
            {isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-green-500 hover:text-black w-full rounded-t-lg cursor-pointer"
              >
                <FiEdit2 size={14} /> Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-green-500 hover:text-black w-full rounded-t-lg cursor-pointer"
              >
                <FiEdit2 size={14} /> Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-500 hover:text-white w-full rounded-b-lg cursor-pointer"
            >
              <FiTrash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
