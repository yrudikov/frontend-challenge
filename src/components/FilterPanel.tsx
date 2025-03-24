import React from 'react';
import { FilterType } from './FilterType';
import content from '../data/content.json';

type FilterPanelProps = {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="task-filters">
            {content.taskList.filters.map((item) => (
                <button
                    key={item.value}
                    className={`filter-button ${currentFilter === item.value ? 'active' : ''}`}
                    onClick={() => onFilterChange(item.value as FilterType)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default FilterPanel;