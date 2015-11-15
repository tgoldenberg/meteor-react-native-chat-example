'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import Login from './login';
import Register from './register';
import ddp from '../config/ddp';
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ActivityIndicatorIOS,
} = React;

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      login: true,
    }
  }
  componentWillMount() {
    ddp.initialize()
      .then(() => {
        return ddp.loginWithToken();
      })
      .then((res) => {
        let state = {
          connected: true,
          loggedIn: false
        };
        if (res.loggedIn === true) {
          state.loggedIn = true;
          state.userId= res.userId;
        }
        this.setState(state);
      });
  }
  render(){
    let titleConfig = { title: 'Signup', tintColor: 'white' };
    let register = <View></View>;
    let login = <View></View>;
    if (this.state.login) {
      login = <Login switch={() => {this.setState({register: true, login: false})}} />
    }
    if (this.state.register) {
      register = <Register switch={() => {this.setState({register: false, login: true})}}/>
    }

    return (
      <View style={{flex: 1}}>
        <NavigationBar title={titleConfig} tintColor='black'/>
        {register}
        {login}
      </View>
    )
  }
};

module.exports = Signup;
