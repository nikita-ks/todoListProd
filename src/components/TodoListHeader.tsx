import React from "react";

const s = require("./TodoList.module.css");

interface IProps {
    title: string;
    tasksCount: number;
    addForm: boolean;
}

class TodoListHeader extends React.Component<IProps> {
    render() {
        let color = this.props.addForm ? '#ff2851' : '#0a0224';
        return (
            <div className={s.headerWrapper} style={{backgroundColor: color}}>
                <div className={s.title}> {this.props.title} </div>
                <div className={s.tasksCounter}> {this.props.tasksCount} open task</div>
            </div>
        )
    }
}

export default TodoListHeader;