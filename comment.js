import React, {Component} from 'react';
import moment from 'moment';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AppState,
  Modal
} from 'react-native';

import Expo from 'expo';

import * as firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD1KkQ_Pq8lBALlgP-HUwQxmxGHuyhSSlw",
    authDomain: "fir-02-72a3b.firebaseapp.com",
    databaseURL: "https://fir-02-72a3b.firebaseio.com",
    projectId: "fir-02-72a3b",
    storageBucket: "fir-02-72a3b.appspot.com",
    messagingSenderId: "784916233609"
  };



  /*resetPass(){
    firebase.auth().sendPasswordResetEmail(this.state.email , actionCodeSettings) returns firebase.Promise containing void
}*/

  firebase.initializeApp(config);

export default class l12_firebase extends Component {
  constructor(props) {
    super(props);
    this.database = firebase.database();
    this.state = {
      chat: '',
      chats: [],
      userOnline: 0,
      modalVisible: true,
      name: "Anonymous",
      show: "login",
      email:"",
      password:""
    }
    this.userOnlineRef = this.database.ref('userOnline');
    this.chatsRef = this.database.ref('chats');
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.register=this.register.bind(this);
    this.login=this.login.bind(this);
    this.listeningForAuthChange=this.listeningForAuthChange.bind(this);
    //this.loginWithFacebook=this.loginWithFacebook.bind(this);
    this.resetPass=this.resetPass.bind(this);

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange() {
    console.log("AppState", AppState.currentState);
    if (AppState.currentState == 'active') {
      this.getNumberOfUserOnlineOnceAndIncreaseBy1ByTransaction();
    } else if (AppState.currentState == 'inactive') {
      this.decreaseNumberOfUserOnlineByTransaction();
    }
  }

  getNumberOfUserOnlineOnceAndIncreaseBy1ByTransaction() {
    this.userOnlineRef.transaction(function(currentUserOnline) {
      return currentUserOnline + 1;
    });
  }

  decreaseNumberOfUserOnlineByTransaction() {
    this.userOnlineRef.transaction(function(currentUserOnline) {
      return currentUserOnline > 0
        ? currentUserOnline - 1
        : 0;
    });
  }
  listeningForNumberOfUserOnline() {
    this.userOnlineRef.on('value', (snapshot) => {
      console.log("UserOnline change", snapshot.val());
      this.setState({userOnline: snapshot.val()});
    });
  }

  resetPass(){
    console.log("reset pass is called");

  var actionCodeSettings =null;

  firebase.auth().sendPasswordResetEmail(
      this.state.email, actionCodeSettings)
      .then(function() {
        console.console.log("success");
      })
      .catch(function(error) {
        console.log("fail");
      });
    }

  listeningForChatChange() {
    this.chatsRef.on('value', (snapshot) => {
      console.log("Chats change:", snapshot.val());
      //for loop foreach chats
      // Check if chats[i].seen array is contain my username or not?
      // If not? Insert my username into chats[i].seen array

      this.setState({
        chats: snapshot.val() || []
      });
    })
  }

  listeningForAuthChange(){
    firebase.auth().onAuthStateChanged((user)=>{
      console.log('auth',user);
      if(user){
        this.setState({name: user.email});
      }else{
        this.setState({name:'Anonymous',modalVisible:true});
      }
    });
  }
  componentDidMount() {
    this.listeningForNumberOfUserOnline();
    this.getNumberOfUserOnlineOnceAndIncreaseBy1ByTransaction();
    this.listeningForChatChange();
    this.listeningForAuthChange();

  }

/*  async loginWithFacebook(){
    const {type,token}= await Expo.Facebook.logInWithReadPermissionsAsync('208567633018175',{
      permissions: ['public_profile','email','user_friends']
    });
    console.log(type,token);

    if(type=='success'){
      console.log("success");
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInWithCredential(credential)
        .then((user) => {
          console.log('facebook auth:', user);
          this.setState({name: user.email, modalVisible: false});
        })
        .catch((error) => {
          // Handle Errors here.
          this.setState({name: 'Anonymous', modalVisible: true});
          alert("An error occured: " + error.message);
        });
    }
  }*/

  login() {
      console.log(this.state.email, this.state.password);
      firebase.auth().signInWithEmailAndPassword(this.state.email,
         this.state.password).then((user) => {
        this.setState({show: "login", modalVisible: false});
        console.log("Login user successfully");
      }).catch((err) => {
        alert("An error occured: " + err.message);
        console.log('An error occurred', err);
      })
    }

    register() {
    console.log(this.state.email, this.state.password);
    firebase.auth().createUserWithEmailAndPassword(this.state.email,
       this.state.password).then((user) => {
      this.setState({show:"login", modalVisible: false});
      console.log("Create user successfully");
    }).catch((err) => {
      alert("An error occured: " + err.message);
      console.log('An error occurred', err);
    })
  }







  signOut(){
    firebase.auth().signOut().then(res=>{
      console.log('You have been signOut')
    }).catch(err=>console.log('Uh oh.. something weird happened'));
  }

  sendChat() {
    console.log(this.state.chat);
    this.chatsRef.transaction((chats) => {
      if (!chats) {
        chats = [];
      }
      chats.push({name: this.state.name, chat: this.state.chat, when: new Date().getTime()});
      this.setState({chat: ""});
      return chats;
    });
  }

  render() {

    let authUI;

if (this.state.show=='login') {
  authUI = (
    <View>
      <Text style={styles.title}>Login</Text>
      <Text>E-mail</Text>
      <TextInput keyboardType="email-address" autoCapitalize="none"
        style={styles.textInput} value={this.state.email}
        onChangeText={(t) => this.setState({email: t})}></TextInput>
      <Text>Password</Text>
      <TextInput secureTextEntry={true} style={styles.textInput}
        value={this.state.password}
        onChangeText={(t) => this.setState({password: t})}></TextInput>
      <TouchableOpacity style={styles.submitButton} onPress={this.login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondButton}
        onPress={() => this.setState({show: "register"})}>
        <Text style={styles.secondButtonText}> "Don't have any account?"</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondButton}
        onPress={() => this.setState({show: "forget"})}>
        <Text style={styles.secondButtonText}> "Forget Password"</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity style={styles.transparentButton} onPress={this.loginWithFacebook}>
      <Text style={styles.secondButtonText}>Login With Facebook</Text>*/}
      </TouchableOpacity>
    </View>
  )
} else if(this.state.show=='forget'){
  authUI = (
    <View>
      <Text style={styles.title}>Forget Password</Text>
      <Text>E-mail</Text>
      <TextInput keyboardType="email-address" autoCapitalize="none"
        style={styles.textInput} value={this.state.email}
        onChangeText={(t) => this.setState({email: t})}></TextInput>

      <TouchableOpacity style={styles.secondButton} onPress={this.resetPass}>
        <Text style={styles.buttonText}>reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondButton}
        onPress={() => this.setState({show:"login"})}>
        <Text style={styles.secondButtonText}>Login Again</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity style={styles.transparentButton} onPress={this.loginWith}>
      <Text style={styles.secondButtonText}>Login With Facebook</Text>*/}
      </TouchableOpacity>
    </View>
  )
}


else {
  authUI = (
    <View>
      <Text style={styles.title}>Register</Text>
      <Text>E-mail</Text>
      <TextInput keyboardType="email-address" autoCapitalize="none"
         style={styles.textInput} value={this.state.email}
         onChangeText={(t) => this.setState({email: t})}></TextInput>
      <Text>Password</Text>
      <TextInput secureTextEntry={true} style={styles.textInput}
        value={this.state.password}
        onChangeText={(t) => this.setState({password: t})}></TextInput>
      <TouchableOpacity style={styles.submitButton} onPress={this.register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondButton}
        onPress={() => this.setState({show:"login"})}>
        <Text style={styles.secondButtonText}>Already have account?</Text>
      </TouchableOpacity>

    </View>
  )
}
  let signOut;
  if (!this.state.modalVisible) {
    signOut = (
      <TouchableOpacity style={styles.signOutButton} onPress={this.signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    )
  }


    return (
      <View style={styles.container}>
        <Modal animationType={"slide"} transparent={true} visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeButton} onPress={() => this.setState({modalVisible: false})}>
              <Text>X</Text>
            </TouchableOpacity>
              {authUI}
              </View>
            </Modal>

        <View style={styles.header}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.labelText}>
            Hello {this.state.name}!
          </Text>
          {signOut}
        </View>
        <Text style={styles.labelText}>
          #User online: {this.state.userOnline}
        </Text>
        </View>

        <View style={styles.content}>
          {this.state.chats.map((obj, i) => <View key={i} style={styles.chatContainer}>
            <View style={styles.chatMeta}>
              <Text style={styles.bold}>{obj.name || "Anonymous"}</Text>
              <Text>
                ({moment(obj.when).fromNow()})</Text>
            </View>
            <View style={styles.chat}>
              <Text style={styles.chatText}>{obj.chat}</Text>
            </View>
          </View>)}
        </View>
        <View style={styles.footer}>
          <TextInput style={styles.textInput} value={this.state.chat} onChangeText={(t) => this.setState({chat: t})}></TextInput>
          <TouchableOpacity style={styles.button} onPress={this.sendChat}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatMeta: {
    flexDirection: 'row'
  },
  chat: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 5
  },
  chatText: {
    color: 'white'
  },
  container: {
    flex: 1,
    paddingTop: 20
  },
  content: {
    padding: 10,
    flex: 1
  },
  labelText: {
    fontSize: 20
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 5,
    backgroundColor: '#dddddd'
  },
  footer: {
    height: 50,
    backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    height: 50,
    width: 200,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    width: 100,
    backgroundColor: 'darkblue',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  modal: {
    height: 400,
    width: 300,
    marginTop: 150,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  secondButtonText:{
    color:'white'
  },
  secondButton:{
    alignSelf:'center',
    backgroundColor:'gray',
    height:44,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    margin:10
  },
  signOutButton:{
    padding:5
  },
  signOutText:{
    color:'red'
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: 'darkblue',
    width: 100,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  title:{
    fontSize:20,
    fontWeight:'bold'
  },
  transparentButton:{
    alignSelf: 'center',
    height:44,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    margin:5,
    padding:2
  }
});
