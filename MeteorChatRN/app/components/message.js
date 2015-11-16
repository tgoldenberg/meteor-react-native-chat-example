'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

let {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Image,
  TextInput,
  TouchableHighlight,
  View,
  Navigator,
} = React;

class Message extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      translateAnim: new Animated.Value(0),
    }
  }
  componentDidMount() {
     Animated.timing(          // Uses easing functions
       this.state.translateAnim,    // The value to drive
       {toValue: 1},           // Configuration
     ).start();                // Don't forget start!
  }
  render(){
    return (
      <Animated.View 
        style={{
           opacity: 1,
           transform: [{
             translateY: this.state.translateAnim.interpolate({
               inputRange: [0, 1],
               outputRange: [150, 0]
             }),
           }],
         }}
      >
        <View style={styles.container}>
          <Image
            style={styles.icon}
            source={require('./meteor-icon.png')}
          />
          <View style={styles.messageBox}>
            <View style={styles.row}>
              <Text style={styles.author}>{this.props.msg.author}</Text>
              <Text style={styles.sent}>{moment(this.props.createdAt).fromNow()}</Text>
            </View>
            <View style={styles.messageView}>
              <Text style={styles.messageText}>{this.props.msg.message}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
}
let styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  icon: {
    marginTop: 10,
    marginLeft: 13
  },
  messageBox: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 10
  },
  messageView: {
    backgroundColor: 'white',
    flex: 1,
    paddingRight: 15
  },
  messageText: {
    fontSize: 16,
    fontWeight: '300',
  },
  author:{
    fontSize: 12,
    fontWeight: '700'
  },
  sent:{
    fontSize: 12,
    fontWeight: '300',
    color: '#9B9B9B',
    marginLeft: 10,
    color: '#9B9B9B',
    fontWeight: '300',
    marginLeft: 10
  }
})
module.exports = Message;
