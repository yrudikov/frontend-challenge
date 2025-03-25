import React, {memo} from "react";
import styles from "./TaskItem.module.css"

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type TaskItemProps = {
    task: Task;
    onRemove: (id: number) => void;
    onToggle: (id: number) => void;
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

const TaskItem: React.FC<TaskItemProps> = memo( ({ task, onRemove, onToggle, dragHandleProps }) => {

    console.log('TaskItem rendered');

    return (
        <div className={styles.taskItem}>
            <input
                className={styles.taskItemCheckbox}
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span
                style={{ textDecoration: task.completed ? "line-through" : "none"}}
                className={styles.taskItemText} {...dragHandleProps}
            >
        {task.text}
      </span>
            <button
                className={styles.taskItemRemoveButton}
                onClick={() => onRemove(task.id)}
            >
                <img
                    src="/images/icon-cross.svg"
                    alt="Remove"
                    className="button-icon"
                />
            </button>
        </div>
    );
});

export default TaskItem;
