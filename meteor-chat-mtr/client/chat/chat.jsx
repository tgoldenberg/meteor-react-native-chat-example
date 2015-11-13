class Chat extends React.Component{
  render(){
    return (
      <div>
        <p>HELLO WORLD, YOU ARE SIGNED IN!</p>
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
                // this.scrollDown();
              })
            }
          }}>
          <input type="text" ref='message' className='form-control' placeholder='MESSAGE'/>
          <input type="submit" className='btn btn-lg' value='SEND'/>
        </form>
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
