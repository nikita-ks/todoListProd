import React from 'react';
import DeleteButton from "./DeleteButton";

const s = require("./TodoList.module.css");

interface IProps {
    id: string;
    title: string;
    count: number;
    history: any;
    deleteList: (id: string) => void
}


class TodoListTabs extends React.Component<IProps> {
    setCurrentList = () => {
        this.props.history.push(this.props.id);
    };
    delete = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (this.props.id !== '4703b1d4-fd58-473c-8bfa-6bdf9a614e94'){
            this.props.deleteList(this.props.id)
        }
    };

    render() {
        return (
            <div className={s.todoListsWrapper} onClick={this.setCurrentList}>
                <div className={s.tlTitle}>{this.props.title}</div>
                <div className={s.tlCount}>{this.props.count}</div>
                <DeleteButton position='absolute' onClick={this.delete}/>
            </div>
        )
    }
}


export default (TodoListTabs);
