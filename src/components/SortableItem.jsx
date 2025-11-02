import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical } from "react-icons/fa6";
import TaskItem from "./TaskItem";

export const SortableTaskItem = ({ task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        touchAction: "none",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`w-full mb-3 rounded-xl flex items-center justify-between gap-2 shadow-sm 
        ${isDragging
                    ? "bg-green-100 dark:bg-[#222]"
                    : "bg-gray-100 dark:bg-[#171717]"}`}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing select-none flex items-center justify-center pl-2 pr-1 py-3"
                onClick={(e) => e.stopPropagation()}
            >
                <FaGripVertical size={18} className="text-gray-500 dark:text-gray-400" />
            </div>

            <div
                className="flex-1"
                onClick={(e) => e.stopPropagation()}
            >
                <TaskItem task={task} />
            </div>
        </div>
    );
};
