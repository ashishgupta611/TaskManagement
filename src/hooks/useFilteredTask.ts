import { useAppSelector } from ".";

export const useFilteredTask = () => {
    const { tasks, filter} = useAppSelector((state) => state.rootReducer.tasks);

    switch (filter) {
        case 'completed':
            return tasks.filter((task) => task.endDate);
        case 'pending':
            return tasks.filter((task) => !task.endDate);
        default:
            return tasks;
    }
};