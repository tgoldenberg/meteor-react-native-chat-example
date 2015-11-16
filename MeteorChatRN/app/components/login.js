'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';
let {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  DeviceEventEmitter,
  View,
  Navigator,
} = React;


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      keyboardOffset: 0
    }
  }
  _keyboardWillShow(e) {
      var newCoordinates = e.endCoordinates.height;
      this.setState({
          keyboardOffset: newCoordinates
      })
  }
  _keyboardWillHide(e) {
      this.setState({
          keyboardOffset: 0
      })
  }
  componentDidMount(){
    ddp.initialize();
    _keyboardWillShowSubscription = DeviceEventEmitter.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
    _keyboardWillHideSubscription = DeviceEventEmitter.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
  }
  render(){
    return (
      <ScrollView style={[styles.container, {paddingBottom: this.state.keyboardOffset}]}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          style={styles.input}
          ref='registerUsername'
          placeholder={"Username"}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          />
        <TextInput
          style={styles.input}
          ref='registerPassword'
          placeholder="Password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          />
        <TouchableHighlight
          underlayColor='#D97573'
          style={styles.button}
          onPress={() => {
            let self = this;
            let {username, password} = this.state;
            if (username != '' && password != '') {
              console.log('CREDS', username, password);
              ddp.loginWithPassword(username, password)
              .then((res) => {
                console.log('RES', res);
                if (res.loggedIn === true) {
                  this.props.loggedIn(res.userId, username);
                }
              })
            }
          }}
          >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='transparent'
          style={styles.linkContainer}
          onPress={() => {
            this.props.switch();
          }}>
          <Text style={styles.link}>Don't have an account? Sign up here!</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
};


let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 50,
    marginBottom: 20,
    fontSize: 16,
    padding: 15,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '300',
    color: '#1A263F',
    padding: 5,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#E0514B',
    padding: 15,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    color: '#1A263F',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  linkContainer: {

  }
});
module.exports = Login;
