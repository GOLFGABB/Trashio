import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={{width:180, height: 180}}
          			source={require('./images/recycling.png')}/>
          		<Text style={styles.logoText}>Welcome to Trash.io.</Text>
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});
