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
  TouchableHighlight,
  View,
  Navigator,
  ActivityIndicatorIOS,
} = React;

class Message extends React.Component{
  render(){
    return (
      <View>
        <Text>ICON PLACEHOLDER</Text>
        <View>
          <View>
            <Text>{this.props.msg.message}</Text>
          </View>
          <Text>by {this.props.msg.author}</Text>
          <Text>sent on {this.props.msg.createdAt.toLocaleDateString()}</Text>
        </View>
      </View>
    )
  }
}

module.exports = Message;
