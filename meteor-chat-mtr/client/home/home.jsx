class Register extends React.Component{
  render(){
    return (
      <div>
        <form className="signup" onSubmit={(e) => {
            e.preventDefault();
            let username = React.findDOMNode(this.refs.registerUsername).value;
            let password = React.findDOMNode(this.refs.registerPassword).value;
            React.findDOMNode(this.refs.registerUsername).value = '';
            React.findDOMNode(this.refs.registerPassword).value = '';
            if (username != '' && password != '')
            Accounts.createUser({
              username: username,
              password: password,
            }, function(err) {
              if (err) { console.log('ERROR', err); }
            });
            Router.go('chat')
          }}>
          <p>Signup</p>
          <input type="text" ref='registerUsername' className="form-control" placeholder="username"/>
          <input type="password" ref='registerPassword' className="form-control" placeholder="password"/>
          <input type="submit" className="btn btn-lg" value="Signup"/><br/>
            <a href="#" onClick={() => { this.props.switch(); }}>
              Login
            </a>
        </form>
      </div>
    );
  }
};

class Login extends React.Component{
  render(){
    return (
      <div>
        <form className="login" onSubmit={(e) => {
            e.preventDefault();
            let username = React.findDOMNode(this.refs.loginUsername).value;
            let password = React.findDOMNode(this.refs.loginPassword).value;
            Meteor.loginWithPassword(username, password, function(err) {
              if (err)
                return throwError(err);
            });
          }}>
          <p>Login</p>
          <input type="text" ref="loginUsername" className="form-control" placeholder="username"/>
          <input type="password" ref="loginPassword" className="form-control" placeholder="password"/>
          <input type="submit" className="btn btn-lg" value="Login"/><br/>
          <a href="#" onClick={() => {this.props.switch(); }}>
            Register
          </a>
        </form>
      </div>
    )
  }
}
class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      register: false,
      login: true,
    }
  }
  render() {
    let login = <div></div>;
    let register = <div></div>;
    if (this.state.login) {
      login = <Login switch={() => {this.setState({register: true, login: false})}} />
    }
    if (this.state.register) {
      register = <Register switch={() => {this.setState({register: false, login: true})}}/>
    }
    return (
      <div>
        <div className="landing-content">
          {register}
          {login}
        </div>
      </div>
    );
  }
};
Tracker.autorun(function() {
  if (Meteor.userId()) {
    Router.go('/chat');
  }
});

Template.home.helpers({
  Landing: function() {
    return Landing;
  }
})
