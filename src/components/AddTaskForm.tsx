import * as React from "react";

const s = require("./TodoList.module.css");

interface IProps {
    deActiveAddForm: () => void;
}

class AddTaskForm extends React.Component<IProps> {
    render() {
        return (
            <div className={s.addTaskFormWrapper}>
                <div className={s.addTitle}>
                    <div className={s.title}>Title</div>
                    <input type="text" placeholder='Enter Task Title'/>
                </div>
                <div className={s.addText}>
                    <div className={s.title}>Description</div>
                    <input type="text" placeholder='Enter Task Description'/>
                </div>
                <div className={s.buttonFormWrapper}>
                    <button className={s.btnClose} onClick={this.props.deActiveAddForm}>Close</button>
                    <button className={s.btnSave} onClick={this.props.deActiveAddForm}>Save</button>
                </div>

            </div>
        )
    }
}

export default AddTaskForm;