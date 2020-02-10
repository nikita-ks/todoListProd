import * as React from "react";
import {ChangeEvent} from "react";
import {ITask, ITaskUpdate} from "../types/ActionTypes";

const s = require("./TodoList.module.css");

interface IProps {
    deActiveAddForm: () => void;
    addTask: (title: string, description: string) => void;
    changeTask: (taskId: string, obj: ITaskUpdate) => void;
    currentTask?: ITask | null
}

interface IState {
    title: string
    desc: string
}

class AddTaskForm extends React.Component<IProps, IState> {
    state: IState = {
        title: '',
        desc: '',
    };

    componentDidMount(): void {
        if (this.props.currentTask) {
            this.setState({
                title: this.props.currentTask.title,
                desc: this.props.currentTask.description ? this.props.currentTask.description : '',
            })
        }
    }

    changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    };
    changeDesc = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({desc: e.currentTarget.value})
    };
    addTask = () => {
        if (this.props.currentTask) {
            this.props.changeTask(this.props.currentTask.id, {
                title: this.state.title,
                description: this.state.desc
            });
        } else {
            this.props.addTask(this.state.title, this.state.desc);
        }

        this.props.deActiveAddForm();
    };
    buttonText = !this.props.currentTask ? 'Add' : 'Save';

    render() {
        return (
            <div className={s.addTaskFormWrapper}>
                <div className={s.inputWrapper}>
                    <div className={s.addTitle}>
                        <div className={s.title}>Title</div>
                        <input value={this.state.title} onChange={this.changeTitle} type="text"
                               placeholder='Enter Task Title'/>
                    </div>
                    <div className={s.addText}>
                        <div className={s.title}>Description</div>
                        <input value={this.state.desc} onChange={this.changeDesc} type="text"
                               placeholder='Enter Task Description'/>
                    </div>
                </div>
                <div className={s.buttonFormWrapper}>
                    <button className={s.btnClose} onClick={this.props.deActiveAddForm}>Close</button>
                    <button className={s.btnSave} onClick={this.addTask}>{this.buttonText}</button>
                </div>
            </div>
        )
    }
}

export default AddTaskForm;