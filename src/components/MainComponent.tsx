import React from "react";
import {Route} from "react-router-dom";
import App from "../App";

const MainComponent = () => {
    let height = document.body.scrollHeight;
    return (
        <>
            <Route path={'/:id?'} render={() => <App height={height}/>}/>
        </>
    )
};
export default MainComponent;