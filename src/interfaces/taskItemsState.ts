import { TaskItem } from "./taskItem";
import { TaskFilter } from "../types";

export interface TaskItemsState {
    tasks: TaskItem[];
    filter: TaskFilter;
}