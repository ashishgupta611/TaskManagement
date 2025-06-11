import { TaskItem } from "./TaskItem";
import { TaskFilter } from "../types";

export interface TaskItemsState {
    tasks: TaskItem[];
    filter: TaskFilter
}