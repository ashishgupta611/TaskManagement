export interface BaseTask {
    id: string;
    title: string;
    description: string;
};

export interface TaskItem extends BaseTask {
    assignedTo?: string;
    status: 'Open' | 'In-Progress' | 'Under-review' | 'Done' | 'Rejected' | 'Cancelled';
    priority: 'Low' | 'Medium' | 'High';
    creationDate: Date;
    startDate?: Date;
    endDate?: Date;
};

export interface TaskCardProps {
  task: TaskItem;
  onEdit?: (taskId: string) => void;
  onDeleteSuccess?: () => void;
  onView?: (taskId: string) => void;
}