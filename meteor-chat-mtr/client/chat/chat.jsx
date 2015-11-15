class Message extends React.Component{
  render(){
    return (
      <div className='message-holder'>
        <i className="mdi mdi-account-box"></i>
        <div className="message-content">
          <div className='message-bubble'>
            <p>{this.props.msg.message}</p>
          </div>
          <p className="message-details">by {this.props.msg.author}</p>
          <p className="message-details">sent on {this.props.msg.createdAt.toLocaleDateString()}</p>
        </div>
        <br/>
      </div>
    )
  }
};
class MessageForm extends React.Component{
  render(){
    return (
      <form className="messages-form" onSubmit={(e) => {
        e.preventDefault();
        let username = Meteor.user().username;
        let message = React.findDOMNode(this.refs.message).value;
        React.findDOMNode(this.refs.message).value = '';
        let options = {
          author: username,
          message: message,
          createdAt: new Date(),
          avatarUrl: "",
        }
        if (message.length) {
          let p1 = new Promise((resolve, reject) => {
            Meteor.call('messageCreate', options, function(msg) {
              resolve(msg)
            });
          })
          .then((msg) => {
            // console.log('msg', message);
            this.props.scrollDown();
          })
        }
      }}>
        <input type="text" ref='message' className='form-control message-input' placeholder='MESSAGE'/>
        <input type="submit" className='btn btn-lg message-send' value='SEND'/>
      </form>
    )
  }
}
class MessageBox extends React.Component{
  componentWillUpdate(){
    this.props.scrollDown();
  }
  render(){
    return (
      <div className="message-box">
        {this.props.messages.map((msg, idx) => {
          return <Message msg={msg} key={idx} />;
        })}
      </div>
    )
  }
}
class Header extends React.Component{
  render(){
    return (
      <div className="header">
        <p className="header-title">Meteor Chat</p>
      </div>
    )
  }
}
class Chat extends React.Component{
  componentDidMount(){
    let height = parseInt($(window).height()) - 130;
    $('.message-box').css({
      height: height,
      overflow: 'auto'
    });
    this.scrollDown();
  }
  componentDidUpdate(){
    this.scrollDown();
  }
  scrollDown(){
    // TODO: scroll to bottom
    console.log('THIS', this);
    let scrollHeight = $('.message-box')[0].scrollHeight;
    console.log('SCROLL', scrollHeight);
    $('.message-box').scrollTop(scrollHeight);
  }
  render(){
    return (
      <div>
        <Header />
        <div ref="container" className="container">
          <MessageBox messages={this.props.messages} scrollDown={this.scrollDown}/>
        </div>
        <MessageForm scrollDown={this.scrollDown}/>
      </div>
    )
  }
}

Template.chat.helpers({
  Chat: function() {
    return Chat;
  },
  messages: function() {
    return Messages.find().fetch();
  }
})
