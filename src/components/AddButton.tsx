import * as React from "react";

const s = require("./TodoList.module.css");

interface IProps {
    addItem: () => void;
}

class AddButton extends React.Component<IProps> {
    render() {
        return (
            <div className={s.buttonAddWrapper}>
                <div onClick={this.props.addItem} className={s.buttonAdd}></div>
            </div>
        )
    }
}

export default AddButton;