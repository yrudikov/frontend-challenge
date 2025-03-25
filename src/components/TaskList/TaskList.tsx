'use client'
import React, {useState, useEffect, FormEvent, useCallback, useMemo} from "react";
import content from "@/data/content.json"
import {FilterType} from "@/components/FilterType";
import FilterPanel from "@/components/TaskListComponents/FilterPanel";
import TasksCounter from "@/components/TaskListComponents/TasksCounter";
import ClearCompletedButton from "@/components/TaskListComponents/ClearCompletedButton";
import {DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, arrayMove, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableTaskItem from "./SortableTaskItem";
import styles from "./TaskList.module.css"
import ThemeButton from "../TaskListComponents/ThemeButton"
import {useIsMobile} from "@/hooks/useIsMobile";

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
    const isMobile = useIsMobile();

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
        setTaskList(prev => [...prev, {id: Date.now(), text, completed: false}]);
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

    const handleDragEnd = useCallback((event: any) => {
        const {active, over} = event;
        if (active.id !== over.id) {
            setTaskList(tasks => {
                const oldIndex = tasks.findIndex(task => task.id === active.id);
                const newIndex = tasks.findIndex(task => task.id === over.id);
                return arrayMove(tasks, oldIndex, newIndex);
            });
        }
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {delay: 150, tolerance: 5}}),
        useSensor(TouchSensor, {activationConstraint: {delay: 250, tolerance: 5}})
    );

    return (
        <section className={styles.taskListSection}>
            <div className={styles.taskList}>
                <div className={styles.taskListHeader}>
                    <h1 className={styles.taskListTitle}>{content.taskList.title}</h1>
                    <ThemeButton/>
                </div>
                <form className={styles.taskListForm} onSubmit={handleFormSubmit}>

                    <div className={styles.taskListAddButtonWrapper}>
                        <button type={'submit'} className={styles.taskListAddButton}>
                    </button>
                    </div>
                    <input
                        type="text"
                        className={styles.taskListInput}
                        name={'taskInput'}
                        placeholder={content.taskList.newTaskPlaceholder}
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                    />

                </form>
                {isLoading ? (
                    <p className={styles.taskListEmpty}>{content.taskList.loading}</p>
                ) : filteredTasks.length === 0 ? (
                    <p className={styles.taskListEmpty}>{content.taskList.noTasks}</p>
                ) : (
                    <div className={styles.taskListItems}>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={filteredTasks.map(task => task.id)}
                                             strategy={verticalListSortingStrategy}>
                                {filteredTasks.map(task => (
                                    <SortableTaskItem
                                        key={task.id}
                                        task={task}
                                        onRemove={removeTask}
                                        onToggle={toggleTask}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                        <div className={styles.taskListFooter}>
                            <TasksCounter taskCount={remainingTasksCount}/>
                            {!isMobile ? (<FilterPanel currentFilter={filter} onFilterChange={setFilter}/>) : null}
                            <ClearCompletedButton
                                onClearCompleted={clearCompletedTasks}
                                disabled={!hasCompletedTasks}
                            />
                        </div>

                    </div>
                )}
                {isMobile ? (<FilterPanel currentFilter={filter} onFilterChange={setFilter}/>) : null}
                <p className={styles.dnd}>{content.dnd}</p>
            </div>
        </section>
    );
};

export default TaskList;
