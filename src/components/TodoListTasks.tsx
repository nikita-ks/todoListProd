import * as React from "react";
import Task from "./Task";
import {ITask} from "../types/ActionTypes";

const s = require("./TodoList.module.css");

interface IProps {
    tasks: ITask[]
}

class TodoListTasks extends React.Component<IProps> {
    render() {
        let tasks = this.props.tasks.map(task => {
            return <Task key={task.id} id={task.id} title={task.title} desc={task.desc}/>
        });
        return (
            <div className={s.tasksWrapper}>
                {tasks}
            </div>
        )
    }
}

export default TodoListTasks;