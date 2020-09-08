import { AppState } from "./store";
import { ITodoList } from "../types/ActionTypes";

export const getTodolistsSelector = (state: AppState): ITodoList[] => {
    const todoLists: ITodoList[] = [...state.todolists.todoLists];
        todoLists.sort((a: any, b: any) => {
            return b.order - a.order
        });
        return todoLists;
};