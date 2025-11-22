export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type TaskFormValue = {
    title: string;
    description: string;
    status: TaskStatus
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export interface JsonPlaceholderTodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
