import {
    SET_TODOLISTS,
    SET_TASKS,
    ADD_TASK,
    ADD_LIST,
    CHANGE_TASK,
    DELETE_TASK, CHANGE_LIST_TITLE, DELETE_LIST,
} from "../redux/reducer";
import exp from "constants";


export enum TasksStatus {
    New = 0,
    Completed = 2
}

export interface ITask {
    id: string
    title: string
    description: string | null
    completed: boolean
    todoListId: string
    order: number
    status: TasksStatus
    priority: number
    startDate?: string | null
    deadline?: string | null
    addedDate: string
}

export interface ITodoList {
    id: string
    title: string
    addedDate: string
    order: number
    tasks: ITask[];
}

export interface ITaskUpdate {
    status?: TasksStatus;
    title?: string;
    description?: string
}

export interface ISetTodoListActionTypes {
    type: typeof SET_TODOLISTS
    todoList: ITodoList
}


export interface ISetTasksActionTypes {
    type: typeof SET_TASKS;
    tasks: ITask[];
    todolistId: string;
}

export interface IAddTaskActionTypes {
    type: typeof ADD_TASK;
    todolistId: string;
    newTask: ITask;
}

export interface IAddListActionTypes {
    type: typeof ADD_LIST;
    newList: ITodoList;
}

export interface IChangeTaskActionTypes {
    type: typeof CHANGE_TASK;
    listId: string;
    task: ITask;
}

export interface IDeleteTaskActionTypes {
    type: typeof DELETE_TASK;
    listId: string;
    taskId: string;
}

export interface IChangeListTitle {
    type: typeof CHANGE_LIST_TITLE;
    title: string;
    listId: string
}
export interface IDeleteList {
    type:typeof DELETE_LIST;
    listId:string;
}

export type ActionsTypes = ISetTodoListActionTypes
    | ISetTasksActionTypes
    | IAddListActionTypes
    | IAddTaskActionTypes
    | IChangeTaskActionTypes
    | IDeleteTaskActionTypes
    | IChangeListTitle
    | IDeleteList
    | IChangeTaskActionTypes;