import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskItem from '../TaskItem/TaskItem';

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type SortableTaskItemProps = {
    task: Task;
    onRemove: (id: number) => void;
    onToggle: (id: number) => void;
};

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ task, onRemove, onToggle }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskItem
                task={task}
                onRemove={onRemove}
                onToggle={onToggle}
            />
        </div>
    );
};

export default React.memo(SortableTaskItem);
