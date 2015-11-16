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
  Image,
  ScrollView,
  TouchableHighlight,
  DeviceEventEmitter,
  View,
  Navigator,
  ActivityIndicatorIOS,
} = React;


class Register extends React.Component{
  constructor(props) {
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
    _keyboardWillShowSubscription = DeviceEventEmitter.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
    _keyboardWillHideSubscription = DeviceEventEmitter.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
  }
  render(){
    return (
      <ScrollView style={[styles.container, {paddingBottom: this.state.keyboardOffset}]}>
        <Text style={styles.title}>Welcome to Meteor Chat!</Text>
        <Image
          style={styles.image}
          source={require('./meteor-welcome.png')}
        />
        <TextInput
          style={styles.input}
          ref='registerUsername'
          placeholder={"Username"}
          value={this.state.username}
          onChange={(e) => {this.setState({username: e.nativeEvent.text})}}
          />
        <TextInput
          style={styles.input}
          ref='registerPassword'
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChange={(e) => {this.setState({password: e.nativeEvent.text})}}
          />
        <TouchableHighlight
          underlayColor='#D97573'
          style={styles.button}
          onPress={() => {
            let {username, password} = this.state;
            if (username != '' && password != '') {
              // console.log('CREDS', username, password);
              ddp.call('registerUser', [this.state.username, this.state.password])
                .then(() => {
                  return ddp.loginWithPassword(this.state.username, this.state.password);
                })
                .then((userId) => {
                  this.props.loggedIn(userId, username);
                });
            }
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='transparent'
          style={styles.linkContainer}
          onPress={() => {
            this.props.switch();
          }}>
          <Text style={styles.link}>Already have an account? Login here</Text>
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
  image: {
    alignSelf: 'center',
    marginBottom: 30
  },
  input: {
    height: 50,
    marginBottom: 12,
    fontSize: 16,
    padding: 15,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '300',
    color: '#1A263F',
    padding: 5,
    marginBottom: 10
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
})

module.exports = Register;
