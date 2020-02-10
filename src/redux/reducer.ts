import {
    ISetTodoListActionTypes,
    ITodoList,
    ActionsTypes,
    ITask,
    ISetTasksActionTypes,
    IAddTaskActionTypes, ITaskUpdate, IDeleteTaskActionTypes
} from "../types/ActionTypes";
import {Dispatch} from "redux";
import {api} from "../dal/api";
import {AppState} from "./store";

export const SET_TODOLISTS = 'todolist/reducer/SET_TODOLISTS';
export const SET_TASKS = 'todolist/reducer/SET_TASKS';
export const ADD_TASK = 'todolist/reducer/ADD_TASK';
export const CHANGE_TASK = 'todolist/reducer/CHANGE_TASK';
export const DELETE_TASK = 'todolist/reducer/DELETE_TASK';

interface IInitialState {
    todoLists: ITodoList[]
}

let initialState: IInitialState = {
    todoLists: []
};
export const reducer = (state: IInitialState = initialState, action: ActionsTypes): IInitialState => {
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
        default:
            return state;
    }
};

const setTodolistsAC = (todoList: ITodoList): ISetTodoListActionTypes => {
    return {type: SET_TODOLISTS, todoList}
};

const setTasksAC = (todolistId: string, tasks: ITask[]): ISetTasksActionTypes => {
    return {type: SET_TASKS, todolistId, tasks}
};
const addTaskAC = (todolistId: string, newTask: ITask): IAddTaskActionTypes => {
    return {type: ADD_TASK, todolistId, newTask}
};
const changeTaskAC = (listId: string, task: ITask) => {
    return {type: CHANGE_TASK, listId, task}
};

const deleteTaskAC = (listId: string, taskId: string): IDeleteTaskActionTypes => {
    return {type: DELETE_TASK, listId, taskId};
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

export const changeTaskTC = (listId: string, taskId: string, obj: ITaskUpdate) => (dispatch: Dispatch, getState: Function) => {
    let task = getState().todolists.todoLists.find((tl: ITodoList) => tl.id === listId)
        .tasks.find((t: ITask) => {
            return t.id === taskId
        });
    api.changeTask(listId, taskId, {...task, ...obj}).then((res: ITask) => {
        dispatch(changeTaskAC(listId, res))
    })
};

export const deleteTaskTC = (listId: string, taskId: string) => (dispatch: Dispatch) => {
    api.deleteTask(listId, taskId).then(code => {
        if (code === 0) {
            dispatch(deleteTaskAC(listId, taskId))
        }
    })
};
