import React from "react";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type TaskItemProps = {
    task: Task;
    onRemove: (id: number) => void;
    onToggle: (id: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onRemove, onToggle }) => {
    return (
        <div className={'task-item'}>
            <input
                className={'task-item-checkbox'}
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span
                style={{ textDecoration: task.completed ? "line-through" : "none"}}
                className={'task-item-text'}
            >
        {task.text}
      </span>
            <button
                className={'task-item-remove-button'}
                onClick={() => onRemove(task.id)}
            >
                Remove
            </button>
        </div>
    );
};

export default TaskItem;
