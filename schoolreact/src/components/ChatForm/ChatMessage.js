import React, {Component} from 'react'
import styled from 'styled-components'
import oc from 'open-color'

const Box = styled.div`
border-radius:2px;
flex-direction: column;
border: 2px solid black;
border-bottom:0.1;
height : 850px;
overflow:auto;
`;

const MessageBox = styled.div`
padding:8px;
line-height:auto;
`;

const Message = styled.div`
border:2px solid ${oc.cyan[5]};
border-radius:10px;
line-height: auto;
font-size: 1.25rem;
width: 240px;
padding-left: 3px;
`;

const Label = styled.div`
font-size:1rem;
color : black;
padding-left: 6px;
`;

class ChatMessage extends Component{

static defaultProps = {
    id:''
}

state = {
    data:[]
}

renderMessage(m){
    const {author, message} = m;
    return(
        <MessageBox>
            <Label>{author}</Label>
            <Message>{message}</Message>
        </MessageBox>
    )
}

    render(){
        const {messages} = this.props;
        return(
            <Box>
                {messages.map(m=> this.renderMessage(m))}
            </Box>
        );
    }
}

export default ChatMessage;
