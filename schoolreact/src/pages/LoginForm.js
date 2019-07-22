// JavaScript source code
import React, {Component} from 'react'
import axios from 'axios'
import {InputWithLabel, Button, Wrapper, LinkButton} from 'components'

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
			<Wrapper label = "로그인">
				<InputWithLabel label="아이디" name ="id" placeholder ="아이디" value = {this.state.id} onChange={this.handleChange}/>
				<InputWithLabel label="비밀번호" name ="password" placeholder ="비밀번호" value = {this.state.password} onChange={this.handleChange}/>
			
				<Button  onClick = {this.handleSubmit}>로그인</Button>
				<LinkButton destination ="/register"> 회원가입</LinkButton>
			</Wrapper>
		);
		}
	}

export default LoginForm;