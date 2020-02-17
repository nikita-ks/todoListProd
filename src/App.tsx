import React from 'react';
import './App.css';
import {AppState} from "./redux/store";
import {ActionsTypes, ITodoList} from './types/ActionTypes';
import {addListTC, deleteListTC, setTodoListsTC} from "./redux/reducer";
import {ThunkDispatch} from 'redux-thunk';
import {connect} from 'react-redux';
import TodoListTabs from "./components/TodoListTabs";
import TodoList from "./components/TodoList";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {getTodolistsSelector} from './redux/Selectors';
import AddTodoListForm from "./components/AddTodoListForm";
import TodoListTabsWrapper from "./components/TodoListTabsWrapper";

interface IProps extends RouteComponentProps<any> {
    id?: string
}

interface IMstp {
    todoLists: ITodoList[];
}

interface IMdtp {
    getTodoLists: () => void;
    addList: (title: string) => void;
    deleteList: (listId: string) => void;
}

interface IState {
    addMode: boolean
}


class App extends React.Component<IMstp & IMdtp & IProps, IState> {

    state: IState = {
        addMode: false
    };

    componentDidMount(): void {
        this.props.getTodoLists()
    }

    closeTodoList = () => {
        this.props.history.push('/')
    };

    toggleAddForm = () => {
        this.setState({addMode: !this.state.addMode});
    };
    addNewList = (title: string) => {
        this.props.addList(title);
        this.toggleAddForm();
    };
    deleteTodoList = (id: string) => {
        this.props.deleteList(id)
    };

    render() {
        //почему если ставлю точку останова срабатывает много раз???
        let todoLists = this.props.todoLists.map(tl => {
            return <TodoListTabs history={this.props.history} key={tl.id} id={tl.id} title={tl.title}
                                 count={tl.tasks.length} deleteList={this.deleteTodoList}/>
        });

        let currentTodoList = this.props.todoLists.find((tl: ITodoList) => tl.id === this.props.match.params.id);
        return (
            <div className="App">
                <div className='App-in'>
                    {
                        this.props.match.params.id && currentTodoList
                            ?
                            <TodoList id={currentTodoList.id}
                                      title={currentTodoList.title}
                                      tasks={currentTodoList.tasks}
                                      closeList={this.closeTodoList}/>
                            : this.state.addMode
                            ? <AddTodoListForm addNewList={this.addNewList} toggleAddForm={this.toggleAddForm}/>
                            : <TodoListTabsWrapper onClick={this.toggleAddForm}>{todoLists}</TodoListTabsWrapper>
                    }
                </div>
            </div>
        );
    }
}

const mstp = (state: AppState): IMstp => {
    return {
        todoLists: getTodolistsSelector(state),
    }
};
const mdtp = (dispatch: ThunkDispatch<any, any, ActionsTypes>): IMdtp => {
    return {
        getTodoLists: () => {
            let thunk = setTodoListsTC();
            dispatch(thunk)
        },
        addList: (title: string) => {
            let thunk = addListTC(title);
            dispatch(thunk)
        },
        deleteList: (listId: string) => {
            let thunk = deleteListTC(listId);
            dispatch(thunk)
        }
    }
};

export default withRouter(connect(mstp, mdtp)(App));
