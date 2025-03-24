import React, {memo} from 'react';
import content from '@/data/content.json'

type ClearCompletedButtonProps = {
    onClearCompleted: () => void;
    disabled?: boolean;
};

const ClearCompletedButton: React.FC<ClearCompletedButtonProps> = memo( ({ onClearCompleted, disabled }) => {
    console.log('ClearCompletedButton rendered');
    return (
        <button
            className="clear-completed-button"
            onClick={onClearCompleted}
            disabled={disabled}
        >
            {content.clearButton}
        </button>
    );
});

export default ClearCompletedButton;
