import React from "react";

const s = require("./TodoList.module.css");

interface IProps {
    title: string;
    tasksCount: number
}

class TodoListHeader extends React.Component<IProps> {
    render() {
        return (
            <div className={s.headerWrapper}>
                <div className={s.title}> {this.props.title} </div>
                <div className={s.tasksCounter}> {this.props.tasksCount} open task</div>
            </div>
        )
    }
}

export default TodoListHeader;