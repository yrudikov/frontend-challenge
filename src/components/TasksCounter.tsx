import React, {memo} from 'react';
import content from '@/data/content.json'


type TasksCounterProps = {
    taskCount: number;
};

const TasksCounter: React.FC<TasksCounterProps> = memo( ({ taskCount }) => {

    console.log('TasksCounter rendered');

    return (
        <div className="remaining-tasks-counter">
            {taskCount} {content.taskCounter}
        </div>
    );
});

export default TasksCounter;
