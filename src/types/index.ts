import { ChangeEvent } from "react";

export type InputChangeHandler =  ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
export type TaskFilter = 'all' | 'completed' | 'pending';