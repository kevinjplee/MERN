import React, {Component} from 'react';
import axios from 'axios';
import {InputWithLabel, Submit, Wrapper, ErrorText, LinkButton} from 'components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


class RegisterForm extends Component{
    state ={
        id :'',
        password : '',
        name : '',
        major : '',
        email : '',
        error : '',
        }

        handleChange = (info) => {
            this.setState({
                [info.target.name] : info.target.value
            });
        }

        handleSubmit = (info) => {
            info.preventDefault();
            console.log(this.state);
            axios.post('/registerdata', {
                id: this.state.id,
                password: this.state.password,
                name: this.state.name,
                major: this.state.major,
                email: this.state.email
            })
                .then(response => {
                    console.log(response.data);
                    if(response.data.success) {
                        console.log('successful register')
                        this.props.history.push('/');
                    } else {
                        console.log('sign-up error');
                        console.log(response.data.error);
                        this.setState({
                            error: response.data.error
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
					회원가입</Typography>
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
                <TextField
				variant = "outlined"
				margin = "normal"
				required
				fullWidth
				label ="이름"
				name = "name"
				value = {this.state.name}
				onChange={this.handleChange}
				autoComplete = "name"
				autofocus
				/>
                <TextField
				variant = "outlined"
				margin = "normal"
				required
				fullWidth
				label ="전공"
				name = "major"
				value = {this.state.major}
				onChange={this.handleChange}
				autoComplete = "major"
				autofocus
				/>
                <TextField
				variant = "outlined"
				margin = "normal"
				required
				fullWidth
				label ="이메일"
				name = "email"
				value = {this.state.email}
				onChange={this.handleChange}
				autoComplete = "email"
				autofocus
				/>
                <ErrorText>{this.state.error}</ErrorText>
				<Submit onClick = {this.handleSubmit} fullWidth variant = "contained">회원가입하기</Submit>
                <LinkButton destination ="/" fullWidth variant = "contained"> 로그인화면 </LinkButton>
			</Wrapper>
        );
    }
}

export default RegisterForm;