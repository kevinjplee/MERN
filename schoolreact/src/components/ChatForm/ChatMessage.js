import React, {Component} from 'react'
import styled from 'styled-components'
import oc from 'open-color'

const Wrapper = styled.div`
flex:1;
`;

const Box = styled.div`
border-radius:2px;
flex-direction: column;
border-bottom:0.1;
min-height:90vh;
max-height:93.5vh;
height: 93.5vh;
overflow:auto;
background: ${oc.pink[0]};
`;

const MessageBox = styled.div`
padding:8px;
line-height:auto;
`;

const Message = styled.div`
border-radius:5px;
line-height: auto;
font-size: 1.25rem;
width: 240px;
padding-left: 3px;
background:white;
color:black;
overflow:auto;
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
            <Wrapper>
            <Box>
                {messages.map(m=> this.renderMessage(m))}
            </Box>
            </Wrapper>
        );
    }
}

export default ChatMessage;
