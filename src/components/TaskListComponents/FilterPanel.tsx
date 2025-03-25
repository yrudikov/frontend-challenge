import React, {memo} from 'react';
import { FilterType } from '../FilterType';
import content from '../../data/content.json';
import styles from './FilterPanel.module.css'

type FilterPanelProps = {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = memo( ({ currentFilter, onFilterChange }) => {
    console.log('FilterPanel rendered');
    return (
        <div className={styles.filterPanel}>
            {content.taskList.filters.map((item) => (
                <button
                    key={item.value}
                    className={`${styles.filterButton} ${currentFilter === item.value ? styles.active : ''}`}
                    onClick={() => onFilterChange(item.value as FilterType)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
});

export default FilterPanel;