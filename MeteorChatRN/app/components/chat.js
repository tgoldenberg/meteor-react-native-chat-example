'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ActionSheetIOS,
  ActivityIndicatorIOS,
} = React;

var BUTTONS = [
  'Logout',
  'Cancel',
];
var CANCEL_INDEX = 4;

class Chat extends React.Component{
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
        self.props.navigator.replacePreviousAndPop({
          name: 'Signup',
        })
      }
    });
  }
  render(){
    let self = this;
    let titleConfig = { title: 'Signup', tintColor: 'white' };
    var rightButtonConfig = {
      title: 'Profile',
      handler: function onNext() {
        // TODO: open bottom to give option of logging out
        console.log('LOG OUT?')
        self.showActionSheet();
      }
    };
    return (
      <View style={{flex: 1,}}>
        <NavigationBar title={titleConfig} rightButton={rightButtonConfig} tintColor='black'/>
        <Text>THIS IS THE CHAT SCREEN</Text>
      </View>
    )
  }
};

module.exports = Chat;
