// // import {
// //     ADD_TASK,
// //     ADD_TODOLIST,
// //     CHANGE_TASK,
// //     DELETE_TASK,
// //     DELETE_TODOLIST,
// //     SET_TASKS,
// //     SET_TODOLISTS, UPDATE_LIST
// // } from "../redux/reducer";
//
export interface ITask {
    id: string
    title: string
    description?: string | null
    //completed: boolean
    //todoListId: string
    //order: number
    //status: number
    //priority: number
    startDate?: string | null
    //deadline?: string | null
    //addedDate: string
    desc:string
}

export interface ITodoList {
    id: string
    title: string
    addedDate: string
    order: number
    tasks: ITask[]
}
//
// export interface ISetTodoListActionTypes {
//     type: typeof SET_TODOLISTS
//     todolists: ITodo[]
// }
//
//
// export interface ISetTasksActionTypes {
//     type: typeof SET_TASKS;
//     tasks: ITask[];
//     todolistId: string;
// }
//
// export interface IAddTodoListActionTypes {
//     type: typeof ADD_TODOLIST;
//     newToDoLists: any;
// }
//
// export interface IAddTaskActionTypes {
//     type: typeof ADD_TASK;
//     toDoListId: string;
//     newTask: ITask;
// }
//
// export interface IChangeTaskActionTypes {
//     type: typeof CHANGE_TASK;
//     toDoListId: string;
//     taskId: string;
//     obj: {title?:string, status?:number};
// }
//
// export interface IDeleteTodoListActionTypes {
//     type: typeof DELETE_TODOLIST;
//     toDoListId: string;
// }
//
// export interface IDeleteTaskActionTypes {
//     type: typeof DELETE_TASK;
//     taskId: string;
//     toDoListId: string;
// }
//
// export interface IUpdateListTitleActionTypes {
//     type: typeof UPDATE_LIST;
//     todolistId: string;
//     newTitle: string;
// }
//
// export type ActionsTypes = ISetTodoListActionTypes
//     | ISetTasksActionTypes
//     | IAddTodoListActionTypes
//     | IAddTaskActionTypes
//     | IChangeTaskActionTypes
//     | IDeleteTodoListActionTypes
//     | IDeleteTaskActionTypes
//     | IUpdateListTitleActionTypes