import React, {Component} from 'react';


class ClientCount extends Component {
  render() {
    const clientsConnected = this.props.clientsConnected
    console.log("Rendering <ClientCount/>");
    return (
      <span className='onlineUsersCount' >{clientsConnected} Users Online</span>
    );
  }
}
export default ClientCount;
