import React, {Component} from 'react';
import {ChatFormWrapper, ChatInput, ChatMessage} from 'components/ChatForm'
import io from "socket.io-client";

class ChatForm extends Component{
constructor(){
    super();

    this.socket = io('localhost:3001');
    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };
}
  state = {
    username: this.props.id,
    message: '',
    messages: []
};
handleSendMessage = (m) => {
    this.setState({message: m})
    this.socket.emit('SEND_MESSAGE',{
        author: this.state.username,
        message: this.state.message
    });
    this.setState({message:''});
}   

render(){
    return(
        <ChatFormWrapper>
            <ChatMessage messages = {this.state.messages}>
            </ChatMessage>
            <ChatInput onSendMessage = {this.handleSendMessage}>
            </ChatInput>
        </ChatFormWrapper>
    )
}
}
export default ChatForm;