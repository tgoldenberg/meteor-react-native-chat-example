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
  TextInput,
  TouchableHighlight,
  ScrollView,
} = React;

var BUTTONS = [
  'Logout',
  'Cancel',
];
var CANCEL_INDEX = 1;

class ChatAndroid extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messagesObserver: null,
      newMessage: '',
    }
  }
  componentDidMount(){
    this.refs.invertible.scrollTo(0);
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
  }
  componentWillUnmount() {
   if (this.state.messagesObserver) {
     this.state.messagesObserver.dispose();
   }
  }
  render(){
    console.log('MESSAGES', this.state.messages);
    let self = this;
    let titleConfig = { title: 'Meteor Chat', tintColor: 'white' };
    var rightButtonConfig = {
      title: 'Logout',
      tintColor: '#fff',
      handler: function onNext() {
        ddp.logout();
        self.props.navigator.push({
          name: 'SignupAndroid'
        })
      }
    };
    return (
      <View style={{flex: 1,}}>
        <NavigationBar title={titleConfig} rightButton={rightButtonConfig} tintColor="#1A263F"/>
        <InvertibleScrollView inverted={true} ref='invertible' style={{flex: .8}}>
          <MessageBox messages={this.state.messages} />
        </InvertibleScrollView>
        <View style={{flex: .1, backgroundColor: 'white', flexDirection: 'row'}}>
          <TextInput
            value={this.state.newMessage}
            placeholder='Say something...'
            onChangeText={(text) => {this.setState({newMessage: text})}}
            style={styles.input}
            />
          <TouchableHighlight
            style={styles.button}
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
            underlayColor='red'>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
};

let styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 8,
    flex: 1,
    marginRight: 5,
    fontSize: 16,
    borderWidth: 1,
    margin: 10,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    flex: .4,
    backgroundColor: "#E0514B",
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

module.exports = ChatAndroid;
