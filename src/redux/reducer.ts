import {
    ISetTodoListActionTypes,
    ITodoList,
    ActionsTypes,
    ITask,
    IAddTaskActionTypes,
    ITaskUpdate,
    IDeleteTaskActionTypes,
    IChangeListTitle,
    IAddListActionTypes,
    IChangeTaskActionTypes, IDeleteList,
} from "../types/ActionTypes";
import {Dispatch} from "redux";
import {api} from "../dal/api";
import {AppState} from "./store";

export const SET_TODOLISTS = 'todolist/reducer/SET_TODOLISTS';
export const SET_TASKS = 'todolist/reducer/SET_TASKS';
export const ADD_TASK = 'todolist/reducer/ADD_TASK';
export const ADD_LIST = 'todolist/reducer/ADD_LIST';
export const CHANGE_TASK = 'todolist/reducer/CHANGE_TASK';
export const DELETE_TASK = 'todolist/reducer/DELETE_TASK';
export const DELETE_LIST = 'todolist/reducer/DELETE_LIST';
export const CHANGE_LIST_TITLE = 'todolist/reducer/CHANGE_LIST_TITLE';

interface IInitialState {
    todoLists: ITodoList[];
}

let initialState: IInitialState = {
    todoLists: []
};
export const reducer = (state = initialState, action: ActionsTypes): IInitialState => {
    switch (action.type) {
        case SET_TODOLISTS: {
            return {...state, todoLists: [...state.todoLists, action.todoList]}
        }
        case SET_TASKS: {
            return {
                ...state,
                todoLists: state.todoLists.map((tl: ITodoList) => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }
                })
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map((tl: ITodoList) => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        }
        case ADD_LIST: {
            return {
                ...state,
                todoLists: [...state.todoLists, action.newList]
            }
        }
        case CHANGE_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map((tl: ITodoList) => {
                    if (tl.id === action.listId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map((t: ITask) => {
                                if (t.id === action.task.id) {
                                    return action.task
                                } else {
                                    return t
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        }
        case CHANGE_LIST_TITLE: {
            return {
                ...state,
                todoLists: state.todoLists.map((tl: ITodoList) => {
                    if (tl.id === action.listId) {
                        return {
                            ...tl,
                            title: action.title
                        }
                    } else {
                        return tl
                    }
                })
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                todoLists: state.todoLists.map((tl: ITodoList) => {
                    if (tl.id === action.listId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter((t: ITask) => {
                                return t.id !== action.taskId
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        }
        case DELETE_LIST: {
            return {
                ...state,
                todoLists: state.todoLists.filter((tl: ITodoList) => tl.id !== action.listId)
            }
        }
        default:
            return state;
    }
};

const setTodolistsAC = (todoList: ITodoList): ISetTodoListActionTypes => {
    return {type: SET_TODOLISTS, todoList}
};

const addTaskAC = (todolistId: string, newTask: ITask): IAddTaskActionTypes => {
    return {type: ADD_TASK, todolistId, newTask}
};
const addListAC = (newList: ITodoList): IAddListActionTypes => {
    return {type: ADD_LIST, newList}
};
const changeTaskAC = (listId: string, task: ITask): IChangeTaskActionTypes => {
    return {type: CHANGE_TASK, listId, task}
};

// const del = (listId: string, taskId: string = '') => {
//     if (taskId) {
//         return {type: DELETE_TASK, listId, taskId};
//     } else {
//         return {type: DELETE_LIST, listId};
//     }
// }

const deleteTaskAC = (listId: string, taskId: string): IDeleteTaskActionTypes => {
    return {type: DELETE_TASK, listId, taskId};
};
const deleteListAC = (listId: string): IDeleteList => {
    return {type: DELETE_LIST, listId};
};
const changeListTitleAC = (listId: string, title: string): IChangeListTitle => {
    return {type: CHANGE_LIST_TITLE, listId, title}
};

export const setTodoListsTC = () => (dispatch: Dispatch) => {
    api.getTodoLists().then((todoLists: ITodoList[]) => {
        todoLists.forEach((tl: ITodoList) => {
            api.getTasks(tl.id).then((res: ITask[]) => {
                dispatch(setTodolistsAC({...tl, tasks: res}))
            })
        })
    })
};

export const addTaskTC = (todolistId: string, title: string, description: string) => (dispatch: Dispatch) => {
    api.addTask(todolistId, title).then((newTask: ITask) => {
        api.changeTask(todolistId, newTask.id, {...newTask, description}).then((res: ITask) => {
            dispatch(addTaskAC(todolistId, res))
        })
    })
};
export const addListTC = (title: string) => (dispatch: Dispatch) => {
    api.addList(title).then((newList: ITodoList) => {
        dispatch(addListAC({...newList, tasks: []}))
    })
};

export const changeTaskTC = (listId: string, taskId: string, obj: ITaskUpdate) => (dispatch: Dispatch, getState: () => AppState) => {
    let todoList = getState().todolists.todoLists.find((tl: ITodoList) => tl.id === listId);
    if (todoList) {
        let task = todoList.tasks.find((t: ITask) => t.id === taskId);
        if (task) {
            let newTask = {...task, ...obj};
            api.changeTask(listId, taskId, newTask).then((res: ITask) => {
                dispatch(changeTaskAC(listId, res))
            })
        }
    }
};

export const changeListTitleTC = (listId: string, title: string) => (dispatch: Dispatch) => {
    api.changeListTitle(listId, title).then(res => {
        if (res.resultCode === 0) {
            dispatch(changeListTitleAC(listId, title))
        }
    })
};

export const deleteTaskTC = (listId: string, taskId: string) => (dispatch: Dispatch) => {
    api.deleteTask(listId, taskId).then(code => {
        if (code === 0) {
            dispatch(deleteTaskAC(listId, taskId))
        }
    })
};
export const deleteListTC = (listId: string) => (dispatch: Dispatch) => {
    api.deleteList(listId).then(code => {
        if (code === 0) {
            dispatch(deleteListAC(listId))
        }
    })
};
