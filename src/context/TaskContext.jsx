import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useLocalStorage("tasks", []);

    // Utility to get current date in DD/MM/YYYY format
    const getDate = () =>
        new Date().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

    // Add a new task
    const addTask = useCallback((newTitle) => {
        if (!newTitle.trim()) return;

        const newTask = {
            id: Date.now(),
            title: newTitle.trim(),
            isDone: false,
            updatedAt: getDate()
        };

        setTasks(prev => [newTask, ...prev]);
    }, [setTasks]);

    // Delete a task by ID
    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }, [setTasks]);

    // Toggle task completion status
    const toggleTask = useCallback((id) => {
        setTasks((prevTasks) => {
            const updated = prevTasks.map((t) =>
                t.id === id ? { ...t, isDone: !t.isDone } : t
            );

            // Move completed tasks to bottom
            const sorted = [
                ...updated.filter((t) => !t.isDone),
                ...updated.filter((t) => t.isDone),
            ];

            return sorted;
        });
    }, [setTasks]);

    // Edit task title
    const editTask = useCallback((id, newTitle) => {
        if (!newTitle.trim()) return;

        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, title: newTitle.trim(), updatedAt: getDate() }
                    : task
            )
        );
    }, [setTasks]);

    // Memoize context value to optimize performance
    const value = useMemo(
        () => ({
            tasks,
            setTasks,
            addTask,
            deleteTask,
            toggleTask,
            editTask,
        }),
        [tasks, addTask, deleteTask, toggleTask, editTask]
    );

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

// Custom hook to use TaskContext
export const useTask = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTask must be used within the TaskProvider");
    }

    return context;
};
