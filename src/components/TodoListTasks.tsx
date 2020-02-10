import * as React from "react";
import Task from "./Task";
import {ITask, ITaskUpdate} from "../types/ActionTypes";

const s = require("./TodoList.module.css");

interface IProps {
    tasks: ITask[];
    changeTask: (taskId: string, obj: ITaskUpdate) => void;
    doubleClick: (tasks: ITask) => void;
    deleteTask: (taskId: string) => void;
}

class TodoListTasks extends React.Component<IProps> {


    render() {
        let tasks = this.props.tasks.map(task => {
            return <Task key={task.id} changeTask={this.props.changeTask} deleteTask={this.props.deleteTask}
                         doubleClick={this.props.doubleClick} task={task}/>
        });
        return (
            <div className={s.tasksWrapper}>
                {tasks}
            </div>
        )
    }
}

export default TodoListTasks;