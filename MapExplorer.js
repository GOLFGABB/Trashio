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
  TextInput,
  TouchableOpacity,
  AppState,
  Modal,
  Dimensions,
  ScrollView,
  Button
} from 'react-native';
var {height, width} = Dimensions.get('window');
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
      region: {
        latitude: 	14.06927,
        longitude: 	100.60465,
        latitudeDelta: 0.005,
       longitudeDelta: 0.005,
      },
      term:'',
      markers: [],
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.markersRef = this.database.ref('markers');
    this.register=this.register.bind(this);
    this.login=this.login.bind(this);
    this.listeningForAuthChange=this.listeningForAuthChange.bind(this);
    this.resetPass=this.resetPass.bind(this);
    AppState.addEventListener('change', this.handleAppStateChange);

  }
  onRegionChange(region) {
    this.setState({region});
  }

  moveMaptoLocation(latlng,key){

     this.refs.map.animateToRegion({

         latitudeDelta:0.002,
         longitudeDelta:0.002,
         ...latlng

     },1000);
     setTimeout(() => {
       this.refs[key].showCallout();
   }, 1000);
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
    this.listeningForMarkerChange();
  }

  listeningForMarkerChange() {
    this.markersRef.on('value', (snapshot) => {
      console.log("Chats change:", snapshot.val());
      this.setState({
        markers: snapshot.val() || []
      });
    })
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
      <MapView style={styles.map} ref="map" mapType='satellite' initialRegion={this.state.region} onRegionChange={this.onRegionChange}>

      {this.state.markers.map((marker, i) => {
        var currentUnit= marker.electric.m5;
        var area = marker.area;
        var unitperarea = currentUnit/area;
        if (unitperarea < 100) {
             return (<MapView.Marker key={i} ref={i} coordinate={{latitude: marker.latlng.lat,longitude: marker.latlng.lng}} title={marker.title} image={marker.image}>
             <MapView.Callout>
                             <View style={styles.callout}>

                               <Text style={styles.calloutTitle}>{marker.title}

                               </Text>

                               <Button style={styles.buttonLG} title='More' onPress={()=> this.props.navigator.push({index: 1,
                                     passProps:{var: i , title : marker.title, m1: marker.electric.m1, m2: marker.electric.m2 ,m3: marker.electric.m3,m4: marker.electric.m4,m5: marker.electric.m5,unit: marker.electric.unit,area: marker.area}})}> </Button>
                             </View>
                           </MapView.Callout>
                         </MapView.Marker>);
       }else if(unitperarea < 150) {
            return (<MapView.Marker key={i} ref={i} coordinate={{latitude: marker.latlng.lat,longitude: marker.latlng.lng}} title={marker.title} image={marker.imageR}>
            <MapView.Callout>
                            <View style={styles.callout}>

                              <Text style={styles.calloutTitle}>{marker.title}

                              </Text>

                              <Button style={styles.buttonLG} title='More' onPress={()=> this.props.navigator.push({index: 1,
                                    passProps:{var: i , title : marker.title, m1: marker.electric.m1, m2: marker.electric.m2 ,m3: marker.electric.m3,m4: marker.electric.m4,m5: marker.electric.m5,unit: marker.electric.unit,area: marker.area}})}> </Button>
                            </View>
                          </MapView.Callout>
                        </MapView.Marker>);
      }else{
        return (<MapView.Marker key={i} ref={i} coordinate={{latitude: marker.latlng.lat,longitude: marker.latlng.lng}} title={marker.title} image={marker.imageS}>
        <MapView.Callout>
                        <View style={styles.callout}>

                          <Text style={styles.calloutTitle}>{marker.title}

                          </Text>

                          <Button style={styles.buttonLG} title='More' onPress={()=> this.props.navigator.push({index: 1,
                                passProps:{var: i , title : marker.title, m1: marker.electric.m1, m2: marker.electric.m2 ,m3: marker.electric.m3,m4: marker.electric.m4,m5: marker.electric.m5,unit: marker.electric.unit,area: marker.area}})}> </Button>
                        </View>
                      </MapView.Callout>
                    </MapView.Marker>);
      }


     })}
    </MapView>

    <View style={styles.footer}>
      <TextInput
         style={styles.searchBar}
         placeholder='Search your place here...'
         placeholderTextColor = "#ffffff"
         onChangeText={term => this.setState({term})}
         value={this.state.term}
         />


      <ScrollView contentContainerStyle={styles.contentContainer}>
     {this.state.markers.map((marker, i)=>{
       var smallMark= marker.title.toLowerCase();
       var smallTerm= this.state.term.toLowerCase();
       if (smallMark.indexOf(smallTerm)!== -1) {
            return <LocationButton key={i} name={i}  moveMaptoLocation={this.moveMaptoLocation}  marker={marker}/>;
      }
      else if (this.state.term==''||this.state.term==null) {
          return <LocationButton key={i} name={i} moveMaptoLocation={this.moveMaptoLocation} marker={marker}/>;
     }
    })}
      </ScrollView>

    </View>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF'
},
  map: {
    flex:3,
   marginTop:20,
   width: width,
   height: height*2/3
},
  contentContainer: {
  paddingVertical: 20
},
  footer:{
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
},

  searchBar: {
    height:50,
    width:330,
    borderWidth: 5,
    borderColor: '#d6d7da',
    marginTop:2,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    justifyContent: 'center',
    color:'white',
    paddingLeft: 10
},

  callout:{
  flex: 1,
  paddingLeft: 5,
  paddingRight: 5,
  paddingBottom: 2,
  marginRight: 3,
  marginLeft: 3,
},

  calloutTitle:{
  fontSize: 16,
  justifyContent:'center',
  alignItems:'center'
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
    margin: 12,
    padding:5,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
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
    backgroundColor:'#455a64',
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
    backgroundColor:'#1c313a',
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
});
