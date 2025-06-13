import { TaskItem } from "./task-item";
import { TaskFilter } from "../types";

export interface TaskItemsState {
    tasks: TaskItem[];
    filter: TaskFilter;
}