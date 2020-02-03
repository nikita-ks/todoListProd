import * as React from "react";
const s = require("./TodoList.module.css");

interface IProps {
    addTask: () => void;
}

class AddButton extends React.Component<IProps> {
    render() {
        return (
            <div onClick={this.props.addTask} className={s.buttonAddWrapper}>

            </div>
        )
    }
}

export default AddButton;