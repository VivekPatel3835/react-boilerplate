import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import ClientCount from './ClientCount.jsx';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: {name: 'Anonymous'},
            tempUser: {name: ''},
            messages: [], //messages coming from the server will be stored here as they arrive
            clientsConnected: {clients: 1}
        };
        this.socket = new WebSocket("ws://localhost:3001");
    }

    componentDidMount = () => {
        this.socket.onopen = (event) => {
        };

        this.socket.onmessage = (event) => {
            const incomingMessage = JSON.parse(event.data);
            if (incomingMessage.type === 'clientCount') {
                this.clientsConnected(incomingMessage);
            } else {
                this.broadcastMessage(incomingMessage.username, incomingMessage.content,
                    incomingMessage.type, incomingMessage.id);
            }
        }
    };

    clientsConnected = (clientsConnected) => {
        const updatedClientsCount = clientsConnected;
        this.setState({clientsConnected: updatedClientsCount})
    };

    ifMessageSubmitted = (event) => {
        //triggered anytime enter key is pressed in the chat bar
        if (event.key === 'Enter') {
            const username = this.state.currentUser.name;
            const message = event.target.value;
            const messageType = 'postMessage';

            if (message) {
                this.broadcastMessage(username, message, messageType);
                event.target.value = ''; //clears message input field
            }
        }
    };

    ifUserNameSubmitted = () => {
        if (event.key === 'Enter') {
            const oldUsername = this.state.currentUser.name;
            const newUsername = this.state.tempUser.name;
            const messageType = 'postNotification';
            const message = oldUsername + ' has changed their username to ' + newUsername;

            if (oldUsername !== newUsername) {
                this.broadcastMessage(newUsername, message, messageType);
                event.target.value = ''; //clears message input field
            }
        }
    };


    handleChange = (event) => {
        //triggered when user types in the username field
        const tempUser = {name: event.target.value};
        this.setState({tempUser: tempUser, currentUser: this.state.currentUser})

    };

    broadcastMessage = (username, message, type, uuid) => {
        if (type === 'postNotification' || type === 'postMessage') {
            //sends user message to the server for broadcasting to all clients
            const newMessage = {
                username: username,
                content: message,
                type: type
            };
            const messages = this.state.messages.concat(newMessage);
            this.socket.send(JSON.stringify(newMessage));
        } else if (type === 'incomingNotification' || type === 'incomingMessage') {
            //saves all incoming messages then renders to browser
            const newMessage = {
                id: uuid,
                type: type,
                username: username,
                content: message
            };
            const messages = this.state.messages.concat(newMessage);
            const newUsername = {name: this.state.tempUser.name};
            this.setState({messages: messages, currentUser: newUsername, tempUser: {name: ""}});
        }
    };

    render() {
        return ([
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <ClientCount clientsConnected={this.state.clientsConnected.clients}/>
            </nav>,
            <MessageList messages={this.state.messages}/>,
            <ChatBar ifMessageSubmitted={this.ifMessageSubmitted} ifUserNameSubmitted={this.ifUserNameSubmitted}
                     user={this.state.tempUser} handleChange={this.handleChange}/>
        ]);
    }
}

export default App;
