// JavaScript source code
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { LoginForm, RegisterForm, Home } from 'pages';



class App extends Component{

	state = {
		LoginStatus: '',
		LoginId : ''
	}

	render(){
		return(
			<React.Fragment>
				<Route exact path = "/" component ={LoginForm}/>
				<Route exact path = "/register" component ={RegisterForm}/>
				<Route exact path = "/home" component = {Home}/>
			</React.Fragment>
		);
	}
}

export default App;