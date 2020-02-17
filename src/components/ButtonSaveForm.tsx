import * as React from "react";

interface IProps {
    onClick: () => void;
    buttonText: string;
    class:any
}

function ButtonSaveForm (props: IProps) {
    return (
        <button className={props.class} onClick={props.onClick}>{props.buttonText}</button>
    )
}

export default ButtonSaveForm;