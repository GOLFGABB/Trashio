import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image,
   ScrollView
} from 'react-native';

export default class contact extends Component<{}> {
	render(){
		return(
      <View style={styles.containerLG}>
      <ScrollView style={{marginTop:10}}>
      <View style={styles.containerI}>
        <Image  style={{width:130, height: 130,margin:10}}
                source={require('./images/user.png')}/>
        </View>
        <View style={styles.formLG}>
        <View style={styles.SectionStyle}>
        <Image source={require('./images/name.png')} style={styles.ImageStyle} />
        </View>
        <View style={styles.SectionTextStyle}>
              <Text style={{color:'orange'}}>Mr. Wongsathorn Charoenkul</Text>
        </View>

        <View style={styles.SectionStyle}>
        <Image source={require('./images/phone.png')} style={styles.ImageStyle} />
        </View>
        <View style={styles.SectionTextStyle}>
              <Text style={{color:'orange'}}>08x-xxxx-xxx</Text>
        </View>

        <View style={styles.SectionStyle}>
        <Image source={require('./images/email.png')} style={styles.ImageStyle} />
        </View>
        <View style={styles.SectionTextStyle}>
                <Text style={{color:'orange'}}>golffgabb@gmail.com </Text>
        </View>
        <View style={styles.SectionStyle}>
        <Image source={require('./images/facebook.png')} style={styles.ImageStyle} />
        </View>
        <View style={styles.SectionTextStyle}>
                <Text style={{color:'orange'}}>xxxxxxxx xxxxxxxxx </Text>
          </View>
          </View>

          <View style={styles.containerI}>
            <Image  style={{width:130, height: 130,margin:10}}
                    source={require('./images/user.png')}/>
            </View>
            <View style={styles.formLG}>
            <View style={styles.SectionStyle}>
            <Image source={require('./images/name.png')} style={styles.ImageStyle} />
            </View>
            <View style={styles.SectionTextStyle}>
                  <Text style={{color:'orange'}}>Ms.Siriboon Chaisawat</Text>
            </View>

            <View style={styles.SectionStyle}>
            <Image source={require('./images/phone.png')} style={styles.ImageStyle} />
            </View>
            <View style={styles.SectionTextStyle}>
                  <Text style={{color:'orange'}}>09x-xxxx-xxx</Text>
            </View>

            <View style={styles.SectionStyle}>
            <Image source={require('./images/email.png')} style={styles.ImageStyle} />
            </View>
            <View style={styles.SectionTextStyle}>
                    <Text style={{color:'orange'}}>gaewcha@gmail.com </Text>
            </View>
            <View style={styles.SectionStyle}>
            <Image source={require('./images/facebook.png')} style={styles.ImageStyle} />
            </View>
            <View style={styles.SectionTextStyle}>
                    <Text style={{color:'orange'}}>xxxxxxxx xxxxxxxxx </Text>
              </View>
              </View>

        </ScrollView>
      </View>

);}}


const styles = StyleSheet.create({

  containerLG : {
    backgroundColor:'#5d6b51',
    marginTop:50,
    width:400,
    flex: 1,
    paddingRight:20



  },

  formLG:{
    flexDirection:'row',
    flexWrap:'wrap',
    flexGrow: 2,
    justifyContent:'center',
    alignItems:'center',
    width:300,
    borderColor:'white',
    borderWidth:1,
    borderRadius:20,
    marginLeft:40

  },

  SectionStyle: {


    width:50,

},
SectionTextStyle: {

  width:220,


},
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 32,
    width: 32,
    resizeMode : 'stretch',
    alignItems: 'center'
},
containerI : {
  flexGrow: 1,
  justifyContent:'flex-end',
  alignItems: 'center',
  marginTop:20
},

});
