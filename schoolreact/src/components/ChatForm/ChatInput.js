import React, {Component} from 'react';
import oc from 'open-color';
import styled from 'styled-components';


const Wrapper = styled.div`
border: 2px solid black;
border-radius: 3px;
background: ${oc.cyan[3]};
display:flex;
`;

const InputBox = styled.input`
flex:1;
line-height : 40px;
font-size : 15px;
border: 2px solid ${oc.cyan[3]};
border-radius:2px;
color: ${oc.gray[8]};
overflow:auto;
`;

const SubmitBox = styled.div`
flex:0;
cursor: pointer;
font-weight:600;
&:active{
    background:${oc.cyan[5]};
    font-color: papayawhip;
}

`;

class ChatInput extends Component{
    state = {
        message: ''
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            this.handleSubmit(event);
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state.message);
        this.props.onSendMessage(this.state.message);
        this.setState({message:''});
    }

    render(){
        return(
            <Wrapper>
                <InputBox name = "message" onKeyDown = {this.handleKeyDown} onChange = {this.handleChange} value = {this.state.message}/>
                <SubmitBox onClick = {this.handleSubmit}>↗</SubmitBox>
            </Wrapper>
        )
    }
}

export default ChatInput;