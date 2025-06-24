import { Priority, Status } from "../types";

export interface BaseTask {
    id: string;
    title: string;
    description: string;
};

export interface TaskItem extends BaseTask {
    assignedTo?: string;
    status: Status;
    priority: Priority;
    creationDate: number;
    startDate?: number;
    endDate?: number;
};

export interface TaskCardProps {
  task: TaskItem;
  onEdit?: (taskId: string) => void;
  onDeleteSuccess?: () => void;
  onView?: (taskId: string) => void;
}