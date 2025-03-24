'use client'
import React, {useState, useEffect, FormEvent} from "react";
import TaskItem from "./TaskItem";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type TaskListProps = {
    tasks?: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks = [] }) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTaskList(JSON.parse(storedTasks));
        } else if (tasks.length > 0) {
            setTaskList(tasks);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }, [taskList]);


    const addTask = (text: string) => {
        const newTask: Task = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTaskList([...taskList, newTask]);
    };

    const removeTask = (id: number) => {
        setTaskList(taskList.filter((task) => task.id !== id));
    };

    const toggleTask = (id: number) => {
        setTaskList(
            taskList.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const input = event.currentTarget.elements.namedItem("taskInput") as HTMLInputElement;
        if (input.value.trim()) {
            addTask(input.value.trim());
            input.value = "";
        }
    };

    return (
        <div className={'task-list'}>
        <h1 className={'task-list-title'}>task list</h1>
    <form className={'add-task-form'} onSubmit={handleFormSubmit}>
    <input
        type="text"
    className={'add-task-input'}
    name={'taskInput'}
    placeholder="new task"
    />
    <button type={'submit'} className={'add-task-button'}>
        Add
        </button>
        </form>
    {taskList.length === 0 ? (
        <p className="task-list-empty">No tasks to display</p>
    ) : (
        taskList.map((task) => (
            <TaskItem
                key={task.id}
        task={task}
        onRemove={removeTask}
        onToggle={toggleTask}
        />
    ))
    )}
    </div>
);
};

export default TaskList;
