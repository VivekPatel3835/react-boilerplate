import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
  const messages = this.props.messages.map((message) => {
            if(message.type === 'postNotification'){
              return <Notification eachMessage = {message} key = { message.id } notification = {message.content}/>
            } else if(message.type === 'postMessage'){ //this is where your erro is - there is a logic error here - see the message type and figure out what to do
              return <Message eachMessage = {message} key = { message.id }/>
            } else if(message.type === 'incomingNotification'){
              return <Notification eachMessage = {message} key = { message.id } notification = {message.content}/>
            } else if(message.type === 'incomingMessage'){ //this is where your erro is - there is a logic error here - see the message type and figure out what to do
              return <Message eachMessage = {message} key = { message.id }/>
            } else {
              throw new Error('Error in rendering message list')
            }
    });
  // const notification = <Notification notification={this.props.messages}/>
    return (
        <main className="messages">
          {messages}
        </main>
      );
  }
}
export default MessageList;
