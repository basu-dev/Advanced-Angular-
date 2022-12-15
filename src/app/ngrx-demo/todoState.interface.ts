export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoPayload {
    title: string;
}

export interface TodoState {
    isLoading: boolean;
    todos: Todo[];
    error: string | null;
    addLoading: boolean;
}