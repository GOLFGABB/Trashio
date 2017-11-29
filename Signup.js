import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Logo from './Logo';

import Expo from 'expo';

import * as firebase from 'firebase';

export default class Signup extends React.Component {
  constructor(props) {

    super(props);
    this.database = firebase.database();
    this.state = {
      Email:'',
      Pass:''
    }
     this.register=this.register.bind(this);
  };

  listeningForAuthChange(){
    firebase.auth().onAuthStateChanged((user)=>{
      console.log('auth',user);
      if(user){
        this.setState({Email: user.Email});
      }else{

      }
    });
  }
  componentDidMount() {
    this.listeningForAuthChange();

  }

  register() {
   console.log(this.state.Email, this.state.Pass);
   firebase.auth().createUserWithEmailAndPassword(this.state.Email,
      this.state.Pass).then((user) => {
     alert("Create user successfully");
     this.props.navigator.push({index: 0, passProps:{}})
   }).catch((err) => {
     alert("An error occured: " + err.message);
     console.log('An error occurred', err);
   })
 }


	render() {
		return(
			<View style={styles.container}>
				<Logo/>
        <View style={styles.form}>
        <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor = "#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            onSubmitEditing={()=> this.password.focus()}
            onChangeText={Email => this.setState({Email})}
            value={this.state.Email}
            />
        <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor = "#ffffff"
            ref={(input) => this.password = input}
            onChangeText={Pass => this.setState({Pass})}
            value={this.state.Pass}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.register}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity  onPress={()=> this.props.navigator.push({index: 0, passProps:{}})}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
				</View>
			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  form:{
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  inputBox: {
    width:300,
    height:50,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});
