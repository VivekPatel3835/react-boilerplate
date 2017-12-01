import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import MessageList from './MessageList.jsx';
import ClientCount from './ClientCount.jsx';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      currentUser: {name: ''},
      tempUser: {name: ''},
      messages: [], //messages coming from the server will be stored here as they arrive
      clientsConnected: {clients: 1}
    }
    this.socket = new WebSocket("ws://localhost:3001");
  }

  clientsConnected = (clientsConnected) => {
    console.log('in clientsConnected function'. clientsConnected)
    const updatedClientsCount = clientsConnected;
    this.setState({clientsConnected: updatedClientsCount})
  }

  ifEnter = (event) => {
    //triggered anytime enter key is pressed in the chat bar
    if(event.key === 'Enter') {
      let oldUsername = this.state.currentUser.name || 'Anonymous';
      let newUsername = this.state.tempUser.name || 'Anonymous';
      let message = event.target.value || 'no message';
      let messageType = '';
      switch(event.target.name) {
        case 'Message':
        messageType = 'postMessage';
        break;
        case 'Username':
        messageType = 'postNotification';
        break;
      }
      if(messageType === 'postNotification') {
        message = oldUsername + ' has changed their username to ' + newUsername;
      }
      this.broadcastMessage(oldUsername, message, messageType)
      event.target.value = '';
    }
  }

  handleChange = (event) => {
    //triggered when user types in the username field
    let currentUser = {name: this.state.currentUser.name};
    let tempUser = {name: event.target.value};
    this.setState({tempUser: tempUser, currentUser: currentUser})

  }

  handleSubmit = () => {
    //prevents default action of the username input element
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  saveMessage = (uuid, username, message, type) => {
    //saves all incoming messages then renders to browser
    const newMessage = {
      id: uuid,
      type: type,
      username: username,
      content: message
    }
    const messages = this.state.messages.concat(newMessage);
    const newUsername = {name: this.state.tempUser.name};
    this.setState({messages: messages, currentUser: newUsername});
    console.log('in save message. username --> ', username);
  }

  broadcastMessage = (username, message, type) => {
    //sends user message to the server for broadcasting to all clients
    const newMessage = {
      username: username,
      content: message,
      type: type
    }
    console.log('in broadcast message --> ', username, message, type)
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages});
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount = () => {
    this.socket.onopen = (event) => {
      //object below will be routed through the websocket and will return with no of clients connected
      console.log('Connected to server on PORT 3001')
    };

    this.socket.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      if(incomingMessage.type === 'clientCount') {
        this.clientsConnected(incomingMessage);
        console.log('# of clients connected --> onmessage react' , incomingMessage)
      } else {
        this.saveMessage(incomingMessage.id, incomingMessage.username,
          incomingMessage.content, incomingMessage.type);
      }
    }
  }

  render() {
    console.log("Rendering <App/>");
    return ([
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <ClientCount clientsConnected = {this.state.clientsConnected.clients}/>
      </nav>,
      <MessageList messages = {this.state.messages}/>,
      <ChatBar ifEnter = {this.ifEnter} user={this.state.tempUser} handleChange={this.handleChange}/>
      ]);
  }
}

export default App;
