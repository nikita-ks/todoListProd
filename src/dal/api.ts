import axios from 'axios';
import {ITask} from "../types/ActionTypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': 'a1408a51-e2c8-48b4-9b0f-06ce8121bd8d'}
});

export const api = {
    getTodoLists() {
        return instance.get('').then(response => {
            return response.data
        })
    },
    getTasks(listId: string) {
        return instance.get(`/${listId}/tasks`).then((res) => {
            return res.data.items;
        })
    },
    addTask(listId: string, title: string) {
        return instance.post(`/${listId}/tasks`, {title: title}).then((res) => {
            return res.data.data.item;
        })
    },
    addList(title: string) {
        return instance.post(`/`, {title: title}).then((res) => {
            return res.data.data.item;
        })
    },
    changeTask(listId: string, taskId: string, task: ITask) {
        return instance.put(`/${listId}/tasks/${taskId}`, task).then(res => {
            return res.data.data.item;
        })
    },
    deleteTask(listId: string, taskId: string) {
        return instance.delete(`/${listId}/tasks/${taskId}`).then(res => {
            return res.data.resultCode;
        })
    },
    deleteList(listId: string) {
        return instance.delete(`/${listId}`).then(res => {
            return res.data.resultCode;
        })
    },
    changeListTitle(listId: string, title: string) {
        return instance.put(`/${listId}`, {title}).then(res => {
            return res.data
        })
    }

};