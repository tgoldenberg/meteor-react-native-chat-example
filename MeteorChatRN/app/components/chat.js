'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';
import MessageBox from './messageBox';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ActionSheetIOS,
  ScrollView,
  ActivityIndicatorIOS,
} = React;

var BUTTONS = [
  'Logout',
  'Cancel',
];
var CANCEL_INDEX = 4;

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messagesObserver: null,
    }
  }
  showActionSheet(){
    let self = this;
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex == 0) {
        console.log('LOG OUT NOW');
        ddp.logout();
        self.props.navigator.push({
          name: 'Signup'
        });
      }
    });
  }
  componentWillMount(){
    let self = this;
    ddp.subscribe('messages', [])
      .then(() => {
        let messagesObserver = ddp.collections.observe(() => {
          let messages = [];
          if (ddp.collections.messages) {
            // console.log('COLLECTION', ddp.collections.messages.find())
            messages = ddp.collections.messages.find({});
            // self.setState({messages: messages});
          }
          return messages;
        });
        this.setState({messagesObserver: messagesObserver})
        messagesObserver.subscribe((results) => {
          this.setState({messages: results});
        })
      })
  }
  componentWillUnmount() {
   if (this.state.messagesObserver) {
     this.state.messagesObserver.dispose();
   }
  }
  render(){
    let self = this;
    let titleConfig = { title: 'Signup', tintColor: 'white' };
    var rightButtonConfig = {
      title: 'Profile',
      handler: function onNext() {
        self.showActionSheet();
      }
    };
    return (
      <View style={{flex: 1,}}>
        <NavigationBar title={titleConfig} rightButton={rightButtonConfig} tintColor='black'/>
        <ScrollView>
          <MessageBox messages={this.state.messages} />
        </ScrollView>
      </View>
    )
  }
};

module.exports = Chat;
