import React, {memo} from 'react';
import content from '@/data/content.json'
import styles from './ClearCompletedButton.module.css'

type ClearCompletedButtonProps = {
    onClearCompleted: () => void;
    disabled?: boolean;
};

const ClearCompletedButton: React.FC<ClearCompletedButtonProps> = memo( ({ onClearCompleted, disabled }) => {
    console.log('ClearCompletedButton rendered');
    return (
        <button
            className={styles.clearCompletedButton}
            onClick={onClearCompleted}
            disabled={disabled}
        >
            {content.clearButton}
        </button>
    );
});

export default ClearCompletedButton;
