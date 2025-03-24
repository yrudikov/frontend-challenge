'use client'
import React, {useState, useEffect, FormEvent} from "react";
import TaskItem from "./TaskItem";
import content from "@/data/content.json"
import {FilterType} from "@/components/FilterType";
import FilterPanel from "@/components/FilterPanel";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

const TaskList: React.FC = () => {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>(FilterType.All)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTaskList(JSON.parse(storedTasks));
        }
        setIsLoading(false);
    }, []);


    useEffect(() => {
        if (!isLoading) {
        localStorage.setItem("tasks", JSON.stringify(taskList));
        }
    }, [taskList, isLoading]);


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
                task.id === id ? {...task, completed: !task.completed} : task
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

    const filteredTasks = taskList.filter((task) => {
        switch (filter) {
            case FilterType.Active:
                return !task.completed;
            case FilterType.Completed:
                return task.completed;
            default:
                return true;
        }
    });

    return (
        <div className={'task-list'}>
            <h1 className={'task-list-title'}>{content.taskList.title}</h1>
            <form className={'add-task-form'} onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className={'add-task-input'}
                    name={'taskInput'}
                    placeholder={content.taskList.newTaskPlaceholder}
                />
                <button type={'submit'} className={'add-task-button'}>
                    {content.taskList.addButton}
                </button>
            </form>
            {isLoading ? (
                <p className="task-list-loading">Loading tasks...</p>
            ) : filteredTasks.length === 0 ? (
                <p className="task-list-empty">{content.taskList.noTasks}</p>
            ) : (
                filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onRemove={removeTask}
                        onToggle={toggleTask}
                    />
                ))
            )}

            <FilterPanel currentFilter={filter} onFilterChange={setFilter} />
        </div>
    );
};

export default TaskList;
