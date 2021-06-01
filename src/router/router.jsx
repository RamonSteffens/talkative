import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cadastre from "../components/Cadastre";
import Feedback from "../components/Feedback";
import Home from "../components/Home";
import Login from "../components/Login";
import Meet from "../components/Meet";
import CreateFeedback from "../components/CreateFeedback";
import Material from "../components/Material";

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact={true} component={Login} />
                <Route path='/' exact={true} component={Login} />
                <Route path='/register' exact={true} component={Cadastre} />
                <Route path='/home'  exact={true} component={Home} />
                <Route path='/conteudo'  exact={true} component={Material} />
                <Route path='/reuniao'  exact={true} component={Meet} />
                <Route path='/feedback'  exact={true} component={Feedback} />
                <Route path='/create-feedback'  exact={true} component={CreateFeedback} />
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