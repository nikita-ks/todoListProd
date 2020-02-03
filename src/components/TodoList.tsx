import * as React from "react";
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import AddTaskForm from "./AddTaskForm";
import AddButton from "./AddButton";
import {ITask} from "../types/ActionTypes";

const s = require("./TodoList.module.css");

interface IProps {
    title: string;
    id:string;
    tasks: ITask[]
}

interface IState {
    addForm: boolean;
}

class TodoList extends React.Component<IProps, IState> {
    state = {
        addForm: true,
    };
    activeAddForm = () => {
        this.setState({addForm: true})
    };
    deActiveAddForm = () => {
        this.setState({addForm: false})
    };

    render() {
        let tasksCount = this.props.tasks.length;
        let addTaskForm = <AddTaskForm deActiveAddForm={this.deActiveAddForm}/>;
        let tasksForm =
            <>
                <TodoListTasks tasks={this.props.tasks}/>
                <AddButton addTask={this.activeAddForm}/>
            </>;

        return (
            <div className={s.todoListWrapper}>
                <TodoListHeader title={this.props.title} tasksCount={tasksCount}/>
                {
                    !this.state.addForm ? tasksForm : addTaskForm
                }
            </div>
        )
    }
}

export default TodoList;