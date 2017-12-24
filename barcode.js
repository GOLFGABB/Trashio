import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert ,TouchableOpacity,TextInput,Image} from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import Item from './Item';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    hasCameraPermission: null,
    torch:'off',
    successScan:false
  };
  this.handleBarCodeRead=this.handleBarCodeRead.bind(this);
}

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleBarCodeRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );
    this.setState({successScan:true})
  };
  render() {
  let authUI;
  if (this.state.successScan==true) {
    authUI = (
      <View style={styles.containerLG}>
      <Item/>
        <View style={styles.formLG}>
        <View style={styles.SectionStyle}>
        <Image source={require('./images/product.png')} style={styles.ImageStyle} />
        <TextInput style={styles.inputBoxLG}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="product's name"
            placeholderTextColor = "#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            //onSubmitEditing={()=> this.password.focus()}
            //onChangeText={email => this.setState({email})}
            value={this.state.EmailLG}
            />
        </View>

        <View style={styles.SectionStyle}>
        <Image source={require('./images/list.png')} style={styles.ImageStyle} />
        <TextInput style={styles.inputBoxLG}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="material's type"
            //secureTextEntry={true}
            placeholderTextColor = "#ffffff"
            keyboardType="email-address"
            //ref={(input) => this.password = input}
            //onChangeText={password => this.setState({password})}
            value={this.state.PassLG}
            />
        </View>

        <View style={styles.SectionStyle}>
        <Image source={require('./images/bin.png')} style={styles.ImageStyle} />
            <TextInput style={styles.inputBoxLG}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="bin's color"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                //onSubmitEditing={()=> this.password.focus()}
                //onChangeText={email => this.setState({email})}
                value={this.state.EmailLG}
                />
        </View>
        <View style={styles.SectionStyle}>
        <Image source={require('./images/baht.png')} style={styles.ImageStyle} />
                <TextInput style={styles.inputBoxLG}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="exchange's price"
                    placeholderTextColor = "#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    //onSubmitEditing={()=> this.password.focus()}
                    //onChangeText={email => this.setState({email})}
                    value={this.state.EmailLG}
                    />
          </View>
          </View>
         <TouchableOpacity style={styles.buttonLG}  >
           <Text style={styles.buttonTextLG}>Add to My Bin</Text>
         </TouchableOpacity>


      </View>
    )
  }
  else{
    authUI=(
      <View style={styles.container}>
      {this.state.hasCameraPermission === null ?
        <Text>Requesting for camera permission</Text> :
        this.state.hasCameraPermission === false ?
          <Text>Camera permission is not granted</Text> :
          <BarCodeScanner
            torchMode={this.state.torch}
            onBarCodeRead={this.handleBarCodeRead}
            style={{ height: 220, width: 320}}

          />
      }
      <TouchableOpacity onPress={() => this.setState({ torch: this.state.torch === 'off' ? 'on' : 'off' })}>
      <Image source={require('./images/flashlight.png')} />
      </TouchableOpacity>
      </View>
    )
  }
    return (
      <View style={styles.container}>
        {authUI}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  containerLG : {
    backgroundColor:'#5d6b51',
    marginTop:55,
    marginBottom:10,
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
      marginVertical: 20,
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 32,
    width: 32,
    resizeMode : 'stretch',
    alignItems: 'center'
},
});
