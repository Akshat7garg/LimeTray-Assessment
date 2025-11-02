import { useState, useMemo, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useTask } from "@/context/TaskContext";
import { useThemeContext } from "@/context/ThemeContext";
import { SortableTaskItem } from "./SortableItem";
import TaskItem from "./TaskItem";

export const TaskList = () => {
  const { tasks, setTasks } = useTask();
  const { theme } = useThemeContext();
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((t) => t.isDone);
      case "pending":
        return tasks.filter((t) => !t.isDone);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  const activeTask = activeId
    ? tasks.find((task) => task.id === activeId)
    : null;

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) {
        setActiveId(null);
        return;
      }

      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex((t) => t.id === active.id);
        const newIndex = prevTasks.findIndex((t) => t.id === over.id);
        return arrayMove(prevTasks, oldIndex, newIndex);
      });

      setActiveId(null);
    },
    [setTasks]
  );

  const handleFilterChange = useCallback((type) => {
    setFilter(type);
  }, []);

  return (
    <div className="w-full mt-6">
      <div className="flex justify-center gap-3 mb-5">
        {["all", "pending", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out cursor-pointer border border-gray-700 ${filter === type
              ? theme === "dark"
                ? "bg-green-500 text-black"
                : "bg-green-600 text-white"
              : theme === "dark"
                ? "bg-[#1e1e1e] text-gray-300 hover:bg-[#2a2a2a]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl mx-auto relative overflow-hidden px-4 pb-12">
        {filteredTasks.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => setActiveId(event.active.id)}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveId(null)}
          >
            <SortableContext
              items={filteredTasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`w-full transition-transform duration-200 ${activeId === task.id ? "opacity-40 scale-[0.97]" : "opacity-100"
                    }`}
                >
                  <SortableTaskItem task={task} />
                </div>
              ))}
            </SortableContext>

    
            <DragOverlay>
              {activeTask ? (
                <div className="pointer-events-none overflow-hidden w-full max-w-2xl mx-auto">
                  <TaskItem task={activeTask} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div
            className={`text-center mt-10 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
            {filter === "all"
              ? "No tasks yet. Add one to get started!"
              : filter === "completed"
                ? "No completed tasks yet."
                : "No pending tasks — you're all caught up!"}
          </div>
        )}
      </div>
    </div>
  );
};
