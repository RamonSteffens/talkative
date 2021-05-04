import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'
import Cadastre from './components/Cadastre'
import Home from './components/Home'
import Login from './components/Login'


export default props => (
    <Router history={hashHistory}>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Login}/>
        <Route path='/register' component={Cadastre}/>
        <Route path='/home' component={Home}/>
        <Redirect from='*' to='/'/>
    </Router>
)