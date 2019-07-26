// JavaScript source code
import React, {Component} from 'react'
import axios from 'axios'
import {Submit, Wrapper, LinkButton} from 'components'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class LoginForm extends Component{
	state = {
		id: '',
		password: ''
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
					console.log(this.state.id);
					this.props.history.push({
						pathname: '/home',
						state: {id: this.state.id}
					});
				} else {
					console.log('sign-up error');
					console.log(response.data.result);
					this.setState({
									id:'',
									password:''
		})
				}
				}).catch(error => {
					console.log('sign up server error:');
					console.log(error);
				})
	}

	render(){
		return(
			<Wrapper>
				<Typography component = "h4" variant = "h5" align = "center" gutterBottom = "true"> 
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
				autofocus
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
				autofocus
				/>
			
				<Submit onClick = {this.handleSubmit} fullWidth variant = "contained">
					로그인</Submit>
				<LinkButton destination ="/register" fullWidth variant = "contained"> 
				회원가입</LinkButton>
			</Wrapper>
		);
		}
	}

export default LoginForm;