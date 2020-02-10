import {SET_TODOLISTS, SET_TASKS, ADD_TASK, CHANGE_TASK, DELETE_TASK} from "../redux/reducer";


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
    desc: string
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

//
// export interface IAddTodoListActionTypes {
//     type: typeof ADD_TODOLIST;
//     newToDoLists: any;
// }

export interface IAddTaskActionTypes {
    type: typeof ADD_TASK;
    todolistId: string;
    newTask: ITask;
}

export interface IChangeTaskActionTypes {
    type: typeof CHANGE_TASK;
    listId: string;
    taskId: string;
    task: ITask;
}

// export interface IDeleteTodoListActionTypes {
//     type: typeof DELETE_TODOLIST;
//     toDoListId: string;
// }
//
export interface IDeleteTaskActionTypes {
    type: typeof DELETE_TASK;
    listId: string;
    taskId: string;
}

//
// export interface IUpdateListTitleActionTypes {
//     type: typeof UPDATE_LIST;
//     todolistId: string;
//     newTitle: string;
// }
//
export type ActionsTypes = ISetTodoListActionTypes
    | ISetTasksActionTypes
    // | IAddTodoListActionTypes
    | IAddTaskActionTypes
    | IChangeTaskActionTypes
// | IDeleteTodoListActionTypes
    | IDeleteTaskActionTypes
// | IUpdateListTitleActionTypes