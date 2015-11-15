'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';
import Icon from 'react-native-vector-icons/MaterialIcons'

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
      <View style={{flex: 1,}} >
        <View style={styles.container}>
          <Icon name='account-box' size={60} color='blue'/>
          <View style={styles.messageBox}>
            <View style={styles.messageView}>
              <Text style={styles.messageText}>{this.props.msg.message}</Text>
            </View>
            <Text style={styles.author}>by {this.props.msg.author}</Text>
            <Text style={styles.sent}>sent on {this.props.msg.createdAt.toLocaleDateString()}</Text>
          </View>

        </View>
        <View style={styles.separator}></View>
      </View>
    )
  }
}
let styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  separator: {
    flex: 1,
    height: 2,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    marginLeft: 10,

  },
  messageBox: {
    flex: 1,
    alignItems: 'stretch'
  },
  messageView: {
    borderRadius: 6,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    flex: 1,
  },
  messageText: {
    fontSize: 20,
    fontWeight: '400',
  },
  author:{
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 10,
  },
  sent:{
    fontSize: 13,
    fontWeight: '300',
    marginLeft: 10,
  }
})
module.exports = Message;
