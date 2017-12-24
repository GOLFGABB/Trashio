import React, {Component} from 'react';
import moment from 'moment';
import Logo from './Logo';
import MapView from 'react-native-maps';
import LocationButton from './map_travel_locationButton.js';
import {Navigator} from 'react-native-deprecated-custom-components';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AppState,
  Modal,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import {Expo,Font} from 'expo';

import * as firebase from 'firebase';
// Initialize Firebase
var config = {
   apiKey: "AIzaSyAJk625MhoXqeJ--Iv0FugBIcLptZJ8d_U",
   authDomain: "bincollector-ab99b.firebaseapp.com",
   databaseURL: "https://bincollector-ab99b.firebaseio.com",
   projectId: "bincollector-ab99b",
   storageBucket: "",
   messagingSenderId: "927151997098"
 };
 firebase.initializeApp(config);

export default class comment_new extends Component {
  constructor(props) {
    super(props);
    this.database = firebase.database();
    this.state = {
      modalVisible: true,
      name: "Anonymous",
      show: 'login',
      email:"",
      password:"",
      term:'',

    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.register=this.register.bind(this);
    this.login=this.login.bind(this);
    this.listeningForAuthChange=this.listeningForAuthChange.bind(this);
    this.resetPass=this.resetPass.bind(this);
    AppState.addEventListener('change', this.handleAppStateChange);

  }
  onRegionChange(region) {
    this.setState({region});
  }

  handleAppStateChange() {
    console.log("AppState", AppState.currentState);
    if (AppState.currentState == 'active') {
      //this.getNumberOfUserOnlineOnceAndIncreaseBy1ByTransaction();
    } else if (AppState.currentState == 'inactive') {
    //  this.decreaseNumberOfUserOnlineByTransaction();
    }
  }

  resetPass(){
    console.log("reset pass is called");

  var actionCodeSettings =null;

  firebase.auth().sendPasswordResetEmail(
      this.state.email, actionCodeSettings)
      .then(function() {
        console.log("success");
      })
      .catch((err) => {
        alert("An error occured: " + err.message);
        console.log('An error occurred', err);

      });
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
    this.listeningForAuthChange();
  }

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

  render() {

    let authUI;

if (this.state.show=='login') {
  authUI = (
    <View style={styles.containerLG}>
      <Logo/>
      <View style={styles.formLG}>
      <TextInput style={styles.inputBoxLG}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={email => this.setState({email})}
          value={this.state.EmailLG}
          />
      <TextInput style={styles.inputBoxLG}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
          onChangeText={password => this.setState({password})}
          value={this.state.PassLG}
          />
        </View>
       <TouchableOpacity style={styles.buttonLG}  onPress={this.login}>
         <Text style={styles.buttonTextLG}>Login</Text>
       </TouchableOpacity>
       <TouchableOpacity  onPress={() => this.setState({show:"reset"})}><Text style={styles.signupButtonLG}> Forgot Password?</Text></TouchableOpacity>
      <View style={styles.signupTextContLG}>
        <Text style={styles.signupTextLG}>"Don't have an account yet?"</Text>
        <TouchableOpacity   onPress={() => this.setState({show:"register"})}><Text style={styles.signupButtonLG}> Signup</Text></TouchableOpacity>

      </View>
    </View>
  )
}
else if (this.state.show=='register'){
  authUI = (
    <View style={styles.containerLG}>
      <Logo/>
      <View style={styles.formLG}>
      <TextInput style={styles.inputBoxLG}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={()=> this.password.focus()}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          />
      <TextInput style={styles.inputBoxLG}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
          />
        </View>
        <TouchableOpacity style={styles.buttonLG} onPress={this.register}>
          <Text style={styles.buttonTextLG}>Sign up</Text>
        </TouchableOpacity>
      <View style={styles.signupTextContLG}>
        <Text style={styles.signupTextLG}>Already have an account?</Text>
        <TouchableOpacity   onPress={() => this.setState({show:"login"})}><Text style={styles.signupButtonLG}> Sign in</Text></TouchableOpacity>
      </View>
    </View>
  )
}
else if (this.state.show=='reset'){
  authUI = (
    <View style={styles.containerLG}>
      <Logo/>
      <View style={styles.formLG}>
      <TextInput style={styles.inputBoxLG}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"

          onChangeText={email => this.setState({email})}
          value={this.state.email}
          />
          <TouchableOpacity style={styles.buttonLG} onPress={this.resetPass}>
            <Text style={styles.buttonTextLG}>Reset</Text>
          </TouchableOpacity>
      </View>

          <TouchableOpacity  onPress={() => this.setState({show:"login"})}><Text style={styles.GoBackButton}> Go Back</Text></TouchableOpacity>

   </View>
  )
}


    return (
      <View style={styles.container}>
      <Modal animationType={"slide"} transparent={true} visible={this.state.modalVisible}>
        <View style={styles.modal}>
            {authUI}
            </View>
          </Modal>

      <View style={styles.myAcc}>

        <Text style={{fontSize:26}}>Balance :<Image style={{width:26, height: 26}} source={require('./images/coin.png')} /> <Text style={{color:'orange'}}>100 Baht</Text></Text>

      </View>
      <View style={styles.blockContainer}>

       <TouchableOpacity onPress={()=> this.props.navigator.push({index: 1, passProps:{}})}>
        <View style={styles.block}>
          <View style={styles.ImgBlock}>
            <Image  style={{width:120, height: 120}} source={require('./images/scan.png')}/>
          </View>
            <Text style={styles.textBorder}>Barcode Scanner</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.block}>
          <View style={styles.ImgBlock}>
            <Image  style={{width:120, height: 120}} source={require('./images/search.png')}/>
          </View>
          <Text style={styles.textBorder}>Search</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.props.navigator.push({index: 2, passProps:{}})}>
        <View style={styles.block}>
          <View style={styles.ImgBlock}>
            <Image  style={{width:120, height: 120}} source={require('./images/location.png')}/>
          </View>
          <Text style={styles.textBorder}>Center Near By</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.block}>
          <View style={styles.ImgBlock}>
            <Image  style={{width:120, height: 120}} source={require('./images/contact.png')}/>
          </View>
          <Text style={styles.textBorder}>Contact Us</Text>
        </View>
        </TouchableOpacity>

      </View>
      <Text style={{fontSize:18, marginBottom:8}}>Welcome <Text style={{color:'orange'}}>{this.state.email}</Text></Text>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',

},
  myAcc:{
    justifyContent:'center',
    alignItems:'center',
    width:350,
    height:85,
    marginTop:70,
    padding:20,
    borderColor:'#5d6b51',
    borderWidth:4,
    borderRadius:20,
    backgroundColor:'#fcffad'
  },
  blockContainer:{
    marginTop:-3,
    flex:1,
    justifyContent:'center',
    flexWrap:'wrap'
  },
  ImgBlock:{
    marginBottom:20
  },
  footer:{
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
},
  block:{
    width:150,
    height:200,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#5d6b51',
    borderRadius:10,
    shadowColor:'grey',
    shadowOpacity:0.8
  }
  ,
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
    flex:1,
    width:500,
    marginTop: 30,
    padding:5,
    paddingBottom:26,
    alignSelf: 'center',
    backgroundColor: '#c5e062',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:25

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
  },
  containerLG : {
    backgroundColor:'#5d6b51',
    marginTop:30,
    width:350,
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    borderRadius: 25
  },
  signupTextContLG : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupButtonLG: {
    color:'white',
  	fontSize:16,
  	fontWeight:'500'
  },
  GoBackButton: {
    color:'white',
    fontSize:16,
    fontWeight:'500',
    padding:5
  },
  formLG:{
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  inputBoxLG: {
    width:300,
    height:50,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  buttonLG: {
    width:300,
    backgroundColor:'#88a02e',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonTextLG: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  signupTextContLG : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupTextLG: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButtonLG: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  textBorder:{
    backgroundColor:'#dce25a',
    padding:3,
    width:148,
    textAlign:'center'

  }
});
