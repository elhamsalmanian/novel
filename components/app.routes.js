import React from "react";
import { Switch , Route } from "react-router-dom";
import ChangeInfo from "./profile/change-info";
import About from "./profile/about";
import Information from "./profile/information";

export default function AppRoute (){
    return (
        <Switch>
            <Route exact path={"/home/profile/change-info"} component={ChangeInfo} />
            <Route exact path={"/home/profile/about"} component={About} />
            <Route exact path={"/home/profile"} component={Information} />
        </Switch>
    )
}