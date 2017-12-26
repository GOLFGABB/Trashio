import React, {Component} from 'react';
import {StatusBar,
        TouchableHighlight,
        AppRegistry,
        StyleSheet,
        Text,
        Image,
        View} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MapExplorer from './MapExplorer.js';
import Barcode from './barcode.js';
import Home from './index_w.js';
import Contact from './contact.js';

const routes = [
  {
    title: 'Home',
    index: 0
  },{
    title: 'Barcode Scanner',
    index: 1
  },{
    title: 'MapExplorer',
    index: 2
  },{
    title: 'Contact Us',
    index: 3
  }
]

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="darkgreen"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<Home navigator={navigator} route={routes[route.index]} {...route.passProps}></Home>);
                case 1: return (<Barcode navigator={navigator} route={routes[route.index]} {...route.passProps}></Barcode>);
                case 2: return (<MapExplorer navigator={navigator} route={routes[route.index]} {...route.passProps}></MapExplorer>);
                case 3: return (<Contact navigator={navigator} route={routes[route.index]} {...route.passProps}></Contact>);
              }
            }
          }
          configureScene={
            (route, routeStack) =>
              Navigator.SceneConfigs.FloatFromBottom
          }
          navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                 if (route.index == 0){
                   return null;
                 }
                 return (
                   <TouchableHighlight onPress={()=>navigator.pop()}>
                     <Text style={styles.navigationBarText}>Back</Text>
                   </TouchableHighlight>
                 )
               },
               RightButton: (route, navigator, index, navState) => {

               return (
                 <TouchableHighlight onPress={()=> navigator.push({index: 0, passProps:{}})}>
                   <Text style={styles.navigationBarText}>Logout</Text>
                 </TouchableHighlight>
               )
             },
               Title: (route, navigator, index, navState) =>
             {   if (route.index == 0){
                  return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title} <Image style={{width:26, height: 26, marginTop:8, marginLeft:8}} source={require('./images/home.png')} /></Text>);
                }
                else if (route.index == 1){
                     return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title} <Image style={{width:26, height: 26, marginTop:8, marginLeft:8}} source={require('./images/bs.png')} /></Text>);
                }
                else if (route.index == 2){
                    return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title} <Image style={{width:26, height: 26, marginTop:8, marginLeft:8}} source={require('./images/earth.png')} /></Text>);
                }
                else if (route.index == 3){
                    return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title} <Image style={{width:26, height: 26, marginTop:8, marginLeft:8}} source={require('./images/card.png')} /></Text>);
                }

             },

             }}
             style={styles.navigationBar}
           />
        }
      />
    </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor: '#b2cc4f',
  },
  navigationBarText:{
    color: 'white',
    padding: 10,
    fontSize: 15
  },
  titleText:{
    fontSize: 20,
    paddingTop:5
  }

  });
