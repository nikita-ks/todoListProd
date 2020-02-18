import * as React from "react";

const s = require("./TodoList.module.css");

interface IProps {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    position?: string;
}

function DeleteButton(props: IProps) {
    let styles = {};
    if (props.position) {
        styles = {
            position: props.position,
            bottom: '5px',
            right: '5px',
            backgroundColor: 'rgb(255, 40, 81)',
            opacity:0.1
        };
    }
    return (
        <div className={s.deleteButton} style={{...styles}} onClick={props.onClick}></div>
    )
}

export default DeleteButton;