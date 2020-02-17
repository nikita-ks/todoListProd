import React, {ReactNode} from 'react';

const s = require("./TodoList.module.css");

interface IProps {
    children: ReactNode;
    onClick: () => void
}


function TodoListTabsWrapper(props: IProps) {
    return (
        <>
            <div className={s.todoListsFormWrapper}>
                {props.children}
            </div>
            <div onClick={props.onClick} className={s.buttonAdd}
                 style={{backgroundColor: '#ff2851', flexShrink: 0}}></div>
        </>
    )
}


export default (TodoListTabsWrapper);
