import { ChangeEvent } from "react";

export type InputChangeHandler =  ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
export type TaskFilter = 'all' | 'completed' | 'pending';

export type BorderButtonType = 'normal' | 'edit' | 'delete';

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Open' | 'In-Progress' | 'Under-review' | 'Done' | 'Rejected' | 'Cancelled';
