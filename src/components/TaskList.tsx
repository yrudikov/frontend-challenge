'use client'
import React, {useState, useEffect, FormEvent, useCallback, useMemo} from "react";
import TaskItem from "./TaskItem";
import content from "@/data/content.json"
import {FilterType} from "@/components/FilterType";
import FilterPanel from "@/components/FilterPanel";
import TasksCounter from "@/components/TasksCounter";
import ClearCompletedButton from "@/components/ClearCompletedButton";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

const TaskList: React.FC = () => {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>(FilterType.All)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [taskInput, setTaskInput] = useState("");

    const remainingTasksCount = useMemo(() => {
        return taskList.filter(task => !task.completed).length;
    }, [taskList]);
    const hasCompletedTasks = useMemo(() => {
        return taskList.some(task => task.completed);
    }, [taskList]);

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


    const addTask = useCallback((text: string) => {
        setTaskList(prev => [...prev, { id: Date.now(), text, completed: false }]);
    }, []);

    const removeTask = useCallback((id: number) => {
        setTaskList(prev => prev.filter((task) => task.id !== id));
    }, []);

    const toggleTask = useCallback((id: number) => {
        setTaskList(prev => prev.map(task => task.id === id ? {...task, completed: !task.completed} : task));
    }, []);

    const handleFormSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedInput = taskInput.trim();
        if (trimmedInput) {
            addTask(trimmedInput);
            setTaskInput('');
        }
    }, [addTask, taskInput]);

    const clearCompletedTasks = useCallback(() => {
        setTaskList(prev => prev.filter(task => !task.completed));
    }, []);

    const filteredTasks = useMemo(() => {
        return taskList.filter((task) => {
            switch (filter) {
                case FilterType.Active:
                    return !task.completed;
                case FilterType.Completed:
                    return task.completed;
                default:
                    return true;
            }
        });
    }, [taskList, filter]);



    return (
        <div className={'task-list'}>
            <h1 className={'task-list-title'}>{content.taskList.title}</h1>
            <form className={'add-task-form'} onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className={'add-task-input'}
                    name={'taskInput'}
                    placeholder={content.taskList.newTaskPlaceholder}
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
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
            <div className="task-list-footer">
                <TasksCounter taskCount={remainingTasksCount}/>
                <ClearCompletedButton
                    onClearCompleted={clearCompletedTasks}
                    disabled={!hasCompletedTasks}
                />
            </div>
            <FilterPanel currentFilter={filter} onFilterChange={setFilter}/>
        </div>
    );
};

export default TaskList;
