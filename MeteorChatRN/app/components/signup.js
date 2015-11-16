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
  Image,
  View,
  Navigator,
  ActivityIndicatorIOS,
} = React;

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      register: true,
      login: false,
      userId: '',
      loggedIn: false,
    }
  }

  render(){
    let titleConfig = { title: 'Welcome', tintColor: 'white' };
    let register = <View></View>;
    let login = <View></View>;
    if (this.state.login) {
      login = <Login
                loggedIn={(userId, username) => {
                  this.props.loggedIn(userId, username);
                  this.props.navigator.push({
                    name: 'Chat'
                  })
                }}
                switch={() => {this.setState({register: true, login: false})}} />
    }
    if (this.state.register) {
      register = <Register
                  loggedIn= {(userId, username) => {
                    this.props.loggedIn(userId, username);
                    this.props.navigator.push({
                      name: 'Chat'
                    })
                  }}
                  switch={() => {this.setState({register: false, login: true})}}/>
    }

    return (
      <View style={{flex: 1}}>
        <NavigationBar title={titleConfig} tintColor="#1A263F" />
        {register}
        {login}
      </View>
    )
  }
};

module.exports = Signup;
