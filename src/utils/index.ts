import { TaskItem } from '../interfaces';
import { SortOption, SortDirection } from '../types';

export * from './confirm';
export * from './formatter';


export const hasValidDate = (date?: number): boolean => {
    if (date && date !== -1) {
        return true;
    }
    return false;
};

interface FilterAndSortOption {
    sortBy: SortOption; 
    direction?: SortDirection; 
    searchText?: string;
};

export function filterAndSortTasks(tasks: TaskItem[], options: FilterAndSortOption): TaskItem[] {
    const { sortBy, direction = 'asc', searchText = '' } = options;

    // 1. Filter tasks based on search text (case-insensitive)
    const filteredTasks = searchText
        ? tasks.filter(task => 
              task.title.toLowerCase().includes(searchText.toLowerCase()) ||
              task.description.toLowerCase().includes(searchText.toLowerCase())
          )
        : [...tasks];

    // 2. Sort the filtered tasks
    return filteredTasks.sort((a, b) => {
        let valueA, valueB;

        switch (sortBy) {
            case 'title':
                valueA = a.title.toLowerCase();
                valueB = b.title.toLowerCase();
                break;
            case 'description':
                valueA = a.description.toLowerCase();
                valueB = b.description.toLowerCase();
                break;
            case 'assignedTo':
                valueA = a.assignedTo.toLowerCase();
                valueB = b.assignedTo.toLowerCase();
                break;
            case 'status':
                valueA = a.status;
                valueB = b.status;
                break;
            case 'priority':
                valueA = a.priority;
                valueB = b.priority;
                break;
            case 'creationDate':
                valueA = a.creationDate; // or a.startDate if available
                valueB = b.creationDate;
                break;
            case 'endDate':
                valueA = a.endDate || 0;
                valueB = b.endDate || 0;
                break;
            default:
                return 0;
        }

        let comparison = 0;
        if (valueA < valueB) comparison = -1;
        if (valueA > valueB) comparison = 1;

        return direction === 'asc' ? comparison : -comparison;
    });
}