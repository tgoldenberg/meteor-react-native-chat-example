'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';
import Message from './message';
let {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Navigator,
} = React;

class MessageBox extends React.Component{
  render(){
    return(
      <View style={{flex: 1,}}>
        {this.props.messages.map((msg, idx)=> {
          return <Message msg={msg} key={idx} />;
        })}
      </View>
    )
  }
}

module.exports = MessageBox;
