// JavaScript source code
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { LoginForm, RegisterForm, Home } from 'pages';
import {PrivateRoute} from 'components'
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import {setCurrentUser, userLogout} from "modules/authModule"
import {Provider} from "react-redux"

import store from "store"

if (localStorage.jwtToken){
	const token = localStorage.jwtToken;
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded)) ;

	const currentTime = Date.now() / 1000;
	if(decoded.exp < currentTime) {
		store.dispatch(userLogout());
	}
}

class App extends Component{

	componentDidMount(){
		
	}

	render(){
		return(
			<Provider store = {store}>
			<React.Fragment>
				<Route exact path = "/" component ={LoginForm}/>
				<Route exact path = "/register" component ={RegisterForm}/>
				<Switch>
				<PrivateRoute exact path = "/home" component = {Home}/>
				</Switch>
			</React.Fragment>
			</Provider>
		);
	}
}

export default App;