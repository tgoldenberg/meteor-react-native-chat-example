'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';
import MessageBox from './messageBox';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ActionSheetIOS,
  TextInput,
  TouchableHighlight,
  DeviceEventEmitter,
  ScrollView,
  ActivityIndicatorIOS,
} = React;

var BUTTONS = [
  'Logout',
  'Cancel',
];
var CANCEL_INDEX = 1;

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messagesObserver: null,
      newMessage: '',
      keyboardOffset: 0,
    }
  }
  componentDidMount(){
    this.refs.invertible.scrollTo(0);
  }
  showActionSheet(){
    let self = this;
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex == 0) {
        ddp.logout();
        self.props.navigator.push({
          name: 'Signup'
        });
      }
    });
  }
  _keyboardWillShow(e) {
      var newCoordinates = e.endCoordinates.height;
      console.log(newCoordinates);
      this.setState({
          keyboardOffset: newCoordinates
      })
      this.refs.invertible.scrollTo(0);
  }

  _keyboardWillHide(e) {
      this.setState({
          keyboardOffset: 0
      })
  }
  componentWillMount(){
    let self = this;
    ddp.subscribe('messages', [])
      .then(() => {
        let messagesObserver = ddp.collections.observe(() => {
          let messages = [];
          if (ddp.collections.messages) {
            messages = ddp.collections.messages.find({});
          }
          return messages;
        });
        this.setState({messagesObserver: messagesObserver})
        messagesObserver.subscribe((results) => {
          this.setState({messages: results});
          this.refs.invertible.scrollTo(0);
        })
      })
      _keyboardWillShowSubscription = DeviceEventEmitter.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
      _keyboardWillHideSubscription = DeviceEventEmitter.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
  }
  componentWillUnmount() {
   if (this.state.messagesObserver) {
     this.state.messagesObserver.dispose();
   }
  }
  render(){
    let self = this;
    let titleConfig = { title: 'Meteor Chat', tintColor: 'white' };
    var rightButtonConfig = {
      title: 'Profile',
      tintColor: '#fff',
      handler: function onNext() {
        self.showActionSheet();
      }
    };
    return (
      <View style={{flex: 1, paddingBottom: this.state.keyboardOffset}}>
        <NavigationBar title={titleConfig} rightButton={rightButtonConfig} tintColor="#1A263F"/>
        <InvertibleScrollView inverted={true} ref='invertible' style={{flex: 1}}>
          <MessageBox messages={this.state.messages} />
        </InvertibleScrollView>
        <View style={styles.inputBox}>
          <TextInput
            value={this.state.newMessage}
            placeholder='Say something...'
            onChange={(e) => {this.setState({newMessage: e.nativeEvent.text}); }}
            style={styles.input}
            />
          <TouchableHighlight
            style={this.state.newMessage ? styles.buttonActive : styles.buttonInactive}
            onPress={() => {
              if (this.state.newMessage != '') {
                let options = {
                  author: this.props.username,
                  message: this.state.newMessage,
                  createdAt: new Date(),
                  avatarUrl: '',
                };
                this.setState({newMessage: ''})
                ddp.call('messageCreate', [options]);
              }
            }}
            underlayColor='#D97573'>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
};

let styles = StyleSheet.create({
  inputBox: {
    height: 60,
    backgroundColor: '#F3EFEF',
    flexDirection: 'row'
  },
  input: {
    height: 40,
    padding: 8,
    flex: 1,
    marginRight: 5,
    fontSize: 12,
    borderColor: '#E0E0E0',
    margin: 10,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  buttonActive: {
    flex: .4,
    backgroundColor: "#E0514B",
    borderRadius: 6,
    justifyContent: 'center',
    margin: 10,
  },
  buttonInactive: {
    flex: .4,
    backgroundColor: "#E0514B",
    flex: .4,
    backgroundColor: "#E0514B",
    borderRadius: 6,
    justifyContent: 'center',
    margin: 10,
  },
  buttonInactive: {
    flex: .4,
    backgroundColor: "#eeeeee",
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 6,
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
})

module.exports = Chat;
