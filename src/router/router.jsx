import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cadastre from "../components/Cadastre";
import Home from "../components/Home";
import Login from "../components/Login";

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact={true} component={Login} />
                <Route path='/' exact={true} component={Login} />
                <Route path='/register' exact={true} component={Cadastre} />
                <Route path='/home'  exact={true} component={Home} />
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>
    );
};


/*
            <Route path='/login' component={Login} />
                <Route path='/' component={Login} />
                <Route path='/register' component={Cadastre} />
                <Route path='/home' component={Home} />


*/