/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 const USER_KEY = '@meteorChat:userKey'
 import React from 'react-native';
 import Chat from './app/components/chat';
 import Signup from './app/components/signup';
 import ddp from './app/config/ddp';
 var {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator,
   AsyncStorage,
 } = React;

global.process = {};
global.process.nextTick = setImmediate;

 class MeteorChatRN extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       initialRoute: '',
       loggedIn: false,
       username: '',
     }
   }
   componentWillMount() {
     console.log('MOUNTING')
     let self = this;
     ddp.initialize()
       .then(() => {
         console.log('GOT IT');
         return ddp.loginWithToken();
       })
       .then((res) => {
         let state = {
           connected: true,
           loggedIn: false
         };
         if (res.loggedIn === true) {
           state.loggedIn = true;
           state.userId = res.userId;
           state.username = res.username;
           state.initialRoute = 'Chat';
         } else {
           state.initialRoute = 'Signup';
         }
         this.setState(state);
       });
   }
   render() {
     console.log('INITIAL ROUTE', this.state.initialRoute);
     if (this.state.initialRoute == '') {
       return (
         <View style={{flex: 1}}>
           <Text>LOADING...</Text>
         </View>
       )
     }
     return (
       <Navigator style={{flex: 1}}
         initialRoute={{name: this.state.initialRoute}}
         renderScene={(route, navigator) => {
           if (route.name == 'Chat') {
             return (
               <Chat
                 navigator={navigator}
                 userId={this.state.userId}
                 username={this.state.username}
                 />
             );
           } else if (route.name == 'Signup') {
             return (
               <Signup
                 loggedIn={(userId) => {this.setState({userId: userId})}}
                 navigator={navigator}
                 />
             );
           }
         }}
       />
     );
   }
 };

 var styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   welcome: {
     fontSize: 30,
     textAlign: 'center',
     margin: 10,
     color: 'blue',
   },
   instructions: {
     textAlign: 'center',
     color: '#333333',
     marginBottom: 5,
   },
 });

AppRegistry.registerComponent('MeteorChatRN', () => MeteorChatRN);
