import *as React from 'react';
import './App.css';
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {AppState} from "./redux/store";
import {ITodoList} from './types/ActionTypes';
import TodoList from "./components/TodoList";

interface IMstp {
    todoLists: ITodoList[]
}

interface IMdtp {

}

class App extends React.Component<IMstp & IMdtp> {
    render() {
        let todoLists = this.props.todoLists.map(tl => {
            return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
        });
        return (
            <div className="App">
                {todoLists}
            </div>
        );
    }
}

const mstp = (state: AppState): IMstp => {
    return {
        todoLists: state.todolists.todoLists
    }
};
const mdtp = (dispatch: Dispatch) => {

};

export default connect(mstp, mdtp)(App);
