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

class SignupAndroid extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      login: true,
      userId: '',
      loggedIn: false,
    }
  }

  render(){
    let titleConfig = { title: 'Signup', tintColor: 'white' };
    let register = <View></View>;
    let login = <View></View>;
    if (this.state.login) {
      login = <Login
                loggedIn={() => {this.props.navigator.push({
                  name: 'ChatAndroid'
                })}}
                switch={() => {this.setState({register: true, login: false})}} />
    }
    if (this.state.register) {
      register = <Register
                  loggedIn= {(userId) => {
                    this.props.loggedIn(userId)
                    this.props.navigator.push({
                      name: 'ChatAndroid'
                    })
                  }}
                  switch={() => {this.setState({register: false, login: true})}}/>
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

module.exports = SignupAndroid;
