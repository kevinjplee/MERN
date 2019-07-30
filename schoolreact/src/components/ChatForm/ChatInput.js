import React, {Component} from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div`
border-radius: 3px;
display:flex;
`;

const InputBox = styled.input`
border-top: 2px solid gray;
flex:9;
line-height : 30px;
font-size : 15px;
border-radius:2px;
color: ${oc.gray[8]};
overflow:auto;
`;

const SubmitBox = styled.div`
text-align: center;
flex:1;
cursor: pointer;
font-weight:600;
&:active{
    background:${oc.gray[5]};
    font-color: papayawhip;
}
padding-left: 2px;
padding-right: 2px;

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
                <TextField rowsMax = {3} rows = {1} multiline = {true} name = "message" onKeyDown = {this.handleKeyDown} onChange = {this.handleChange} value = {this.state.message} marign = "normal" variant = "outlined" fullWidth />
                <SubmitBox onClick = {this.handleSubmit}><SendIcon/></SubmitBox>
            </Wrapper>
        )
    }
}

export default ChatInput;