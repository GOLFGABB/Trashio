import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';

export default class Item extends Component<{}> {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={{width:130, height: 130,margin:20}}
          			source={require('./images/bottle.png')}/>
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center',
    borderColor:'white',
    borderWidth:1,
    borderRadius:25,
    width:230,
    height:150,
    marginTop:20
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});
