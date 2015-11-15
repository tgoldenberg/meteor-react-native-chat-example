'use strict';
const USER_KEY = '@meteorChat:userKey'
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ActivityIndicatorIOS,
} = React;

class Chat extends React.Component{
  render(){
    return (
      <View>
        <Text>THIS IS THE CHAT SCREEN</Text>
      </View>
    )
  }
};

module.exports = Chat;
