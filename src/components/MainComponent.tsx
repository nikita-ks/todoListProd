import React from "react";
import {Route} from "react-router-dom";
import App from "../App";

const MainComponent = () => {
    return (
        <div>
            <Route path={'/:id?'} render={() => <App/>}/>
        </div>
    )
};
export default MainComponent;