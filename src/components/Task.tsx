import *as React from "react";
const s = require("./TodoList.module.css");

interface IProps {
    title:string;
    desc:string;
    id:string;
}
class Task extends React.Component<IProps> {
    render() {
        return (
            <div className={s.taskWrapper}>
                <div className={s.checkBox}>
                    <input type="checkbox"/>
                    <span className={s.checkmark}></span>
                </div>

                <div className={s.taskDesc}>
                    <div className={s.taskTitle}>{this.props.title}</div>
                    <div className={s.taskText}>{this.props.desc}</div>
                </div>

            </div>
        )
    }
}

export default Task;