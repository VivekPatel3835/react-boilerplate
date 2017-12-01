import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    return (
     <div className="message">
      <span className="message-username">{this.props.eachMessage.username}</span>
      <span className="message-content">{this.props.eachMessage.content}</span>
     </div>
     );
   }
 }

 export default Message;
