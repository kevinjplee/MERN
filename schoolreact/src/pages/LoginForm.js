// JavaScript source code
import React, {Component} from 'react'
import axios from 'axios'
import {Submit, Wrapper, LinkButton, ErrorText} from 'components'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import setAuthToken from "utils/setAuthToken"
import jwt_decode from "jwt-decode";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from 'modules/authModule'

class LoginForm extends Component{
	state = {
		id: '',
		password: '',
		result:''
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push({
				pathname: '/home'
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push({ 
				pathname: '/home'
			});
		}
	}

	handleChange = (info) => {
		this.setState({
			[info.target.name] : info.target.value
		});
	}

	handleSubmit = (info) => {
		info.preventDefault();
		console.log(this.state);
		axios.post('/logindata', {
			id: this.state.id,
			password: this.state.password
		})
			.then(response => {
				console.log(response.data);
				if(response.data.success) {
					console.log('successful signup')
					const { token } = response.data;
					localStorage.setItem("jwtToken", token);
					setAuthToken(token);
					const decoded = jwt_decode(token);
					console.log(decoded.id);
					const {AuthActions} = this.props;
					AuthActions.setCurrentUser(decoded.id);
				} else {
					console.log('sign-up error');
					console.log(response.data.result);
					this.setState({
									id:'',
									password:'',
									result:response.data.result
		})
				}
				}).catch(error => {
					console.log('sign up server error:');
					console.log(error);
				})
	}

	render(){
		console.log('Login Rendering')
		return(
			<Wrapper>
				<Typography component = "h4" variant = "h5" align = "center" gutterBottom> 
					로그인</Typography>
				<TextField
				variant = "outlined"
				margin = "normal"
				required
				fullWidth
				label ="아이디"
				name = "id"
				value = {this.state.id}
				onChange={this.handleChange}
				autoComplete = "id"
				autoFocus
				/>
				<TextField
				variant = "outlined"
				margin = "normal"
				required
				fullWidth
				label ="비밀번호"
				name = "password"
				value = {this.state.password}
				onChange={this.handleChange}
				autoComplete = "password"
				type = "password"
				/>
				<ErrorText>{this.state.result}</ErrorText>
				<Submit onClick = {this.handleSubmit} fullWidth variant = "contained">
					로그인</Submit>
				<LinkButton destination ="/register" fullWidth variant = "contained"> 
				회원가입</LinkButton>
			</Wrapper>
		);
		}
	}

export default connect(
	(state) => ({
		auth: state.auth
	}),
	(dispatch) => ({
		AuthActions: bindActionCreators(authActions, dispatch)
	})
)(LoginForm);