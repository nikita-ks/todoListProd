import React, {ChangeEvent} from "react";
import Arrow from '../svg/SVG'

const s = require("./TodoList.module.css");

interface IProps {
    title: string;
    tasksCount: number;
    addForm: boolean;
    closeList: () => void;
    changeTitle: (title: string) => void;
}

interface IState {
    changeTitle: boolean;
    title: string
}

class TodoListHeader extends React.Component<IProps, IState> {
    state: IState = {
        changeTitle: false,
        title: this.props.title
    };
    changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value.length <= 15){
            this.setState({title: e.currentTarget.value})
        }

    };
    toggleTitle = () => {
        this.setState({changeTitle: !this.state.changeTitle});
        if (this.state.title !== this.props.title) {
            this.props.changeTitle(this.state.title);
        }
    };

    render() {
        let color = this.props.addForm ? '#ff2851' : '#0a0224';
        return (
            <div className={s.headerWrapper} style={{backgroundColor: color}}>
                {
                   !this.props.addForm && this.state.changeTitle
                        ? <input className={s.inputTitle} autoFocus={true}
                                 onChange={this.changeTitle} value={this.state.title}
                                 onBlur={this.toggleTitle} type="text"/>
                        : <div onClick={this.toggleTitle} style={{cursor:'pointer'}} className={s.title}> {this.props.title} </div>
                }
                <div className={s.tasksCounter}> {this.props.tasksCount} open task</div>
                <div onClick={this.props.closeList}>
                    <Arrow className={s.arrowBack} width={'35'} fill={'#ff2851'}/>
                </div>
            </div>
        )
    }
}

export default TodoListHeader;