import React, {Component} from 'react';
import axios from 'axios';
import {InputWithLabel, Button, Wrapper, ErrorText, LinkButton} from 'components';


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
            <Wrapper label = "회원가입">
				<InputWithLabel label="아이디" name ="id" placeholder ="아이디" value = {this.state.id} onChange={this.handleChange}/>
				<InputWithLabel label="비밀번호" name ="password" placeholder ="비밀번호" value = {this.state.password} onChange={this.handleChange}/>
                <InputWithLabel label="이름" name ="name" placeholder ="이름" value = {this.state.name} onChange={this.handleChange}/>
                <InputWithLabel label="전공" name ="major" placeholder ="전공" value = {this.state.major} onChange={this.handleChange}/>
                <InputWithLabel label="이메일" name ="email" placeholder ="이메일" value = {this.state.email} onChange={this.handleChange}/>
                <ErrorText>{this.state.error}</ErrorText>
				<Button onClick = {this.handleSubmit}>회원가입하기</Button>
                <LinkButton destination ="/"> 로그인화면 </LinkButton>
			</Wrapper>
        );
    }
}

export default RegisterForm;