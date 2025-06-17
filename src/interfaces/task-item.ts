export interface TaskItem {
    id: string;
    name: string;
    description: string;
    creationTime: number;
    completionTime?: number | null | undefined;
    completed?: boolean;
};