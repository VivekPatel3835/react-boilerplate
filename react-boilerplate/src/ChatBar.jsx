import React, {Component} from 'react';


class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder='Username (editable)'
      value={this.props.user.name} name='Username' onChange={this.props.handleChange}
      onKeyPress={this.props.ifEnter}/>
        <input type='text' className="chatbar-message" placeholder="Type a message and hit ENTER"
      name='Message' onKeyPress={ this.props.ifEnter}/>
      </footer>
      );
  }
}
export default ChatBar;
