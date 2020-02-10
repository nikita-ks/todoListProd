import React from 'react';
import './App.css';
import {AppState} from "./redux/store";
import {ActionsTypes, ITodoList} from './types/ActionTypes';
import TodoList from "./components/TodoList";
import {setTodoListsTC} from "./redux/reducer";
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';


interface IMstp {
    todoLists: ITodoList[]
}

interface IMdtp {
    getTodoLists: () => void
}

class App extends React.Component<IMstp & IMdtp> {
    componentDidMount(): void {
        this.props.getTodoLists()
    }

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
const mdtp = (dispatch: ThunkDispatch<any, any, ActionsTypes>): IMdtp => {
    return {
        getTodoLists: () => {
            let thunk = setTodoListsTC();
            dispatch(thunk)
        }
    }
};

export default connect(mstp, mdtp)(App);
