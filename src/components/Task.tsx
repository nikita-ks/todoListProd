import *as React from "react";
import {ChangeEvent} from "react";
import {ITask, TasksStatus, ITaskUpdate} from "../types/ActionTypes";

const s = require("./TodoList.module.css");

interface IProps {
    task: ITask;
    changeTask: (taskId: string, obj: ITaskUpdate) => void;
    doubleClick: (tasks: ITask) => void;
    deleteTask: (taskId: string) => void;
}

class Task extends React.Component<IProps> {
    changeTask = (e: ChangeEvent<HTMLInputElement>) => {
        let status = TasksStatus.New;
        if (e.currentTarget.checked) {
            status = TasksStatus.Completed
        }
        this.props.changeTask(this.props.task.id, {status})
    };
    doubleClick = () => {
        this.props.doubleClick(this.props.task)
    };
    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };

    render() {
        let {task} = this.props;
        let checked = task.status === 2;
        return (
            <div className={s.taskWrapper}>
                <label className={s.bContain}>
                    <input type='checkbox' checked={checked} onChange={this.changeTask}></input>
                    <div className={s.bInput}></div>
                </label>
                <div className={s.taskDesc} onDoubleClick={this.doubleClick}>
                    <div className={s.taskTitle}>{task.title}</div>
                    <div className={s.taskText}>{task.description}</div>
                </div>
                <div className={s.deleteButton} onClick={this.deleteTask}></div>
            </div>
        )
    }
}

export default Task;