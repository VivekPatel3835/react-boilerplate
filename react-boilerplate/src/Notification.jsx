import React, {Component} from 'react';

class Notification extends Component {
  render() {
    const notification = this.props.notification;
    return (
     <div className="message system">
      {notification}
    </div>
    );
  }
}

export default Notification;
