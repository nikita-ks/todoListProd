import * as React from "react";
import ButtonSaveForm from "./ButtonSaveForm";
import {ChangeEvent} from "react";

const s = require("./TodoList.module.css");

interface IProps {
    toggleAddForm: () => void;
    addNewList: (title: string) => void;
}

interface IState {
    title: string;
}


class AddTodoListForm extends React.Component<IProps, IState> {
    state: IState = {
        title: ''
    };
    setTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length <= 15) {
            this.setState({title: e.currentTarget.value})
        }
    };
    addNewList = () => {
        if(this.state.title){
            this.props.addNewList(this.state.title)
        }

    };

    render() {
        return (
            <div className={s.addTaskFormWrapper}>
                <div className={s.title}>New Todolist</div>
                <div className={s.inputWrapper}>
                    <div className={s.addTitle}>
                        <div className={`${s.title} ${s.h4}`}>Todolist Title</div>
                        <input type="text" value={this.state.title} onChange={this.setTitle} placeholder='Enter Todolist Title'/>
                    </div>
                </div>
                <div className={s.buttonFormWrapper}>
                    <ButtonSaveForm class={s.btnClose} onClick={this.props.toggleAddForm} buttonText={'Close'}/>
                    <ButtonSaveForm class={s.btnSave} onClick={this.addNewList} buttonText={'Add'}/>
                </div>
            </div>
        )
    }
}

export default AddTodoListForm;