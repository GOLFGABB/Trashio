import React, {Component} from 'react';
import {StatusBar,
        TouchableHighlight,
        AppRegistry,
        StyleSheet,
        Text,
        View} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MapExplorer from './index_w.js';
import Detail from './barcode.js';

const routes = [
  {
    title: 'Home',
    index: 0
  },{
    title: 'Barcode Scanner',
    index: 1
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
                case 0: return (<MapExplorer navigator={navigator} route={routes[route.index]} {...route.passProps}></MapExplorer>);
                case 1: return (<Detail navigator={navigator} route={routes[route.index]} {...route.passProps}></Detail>);
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
             {
                   return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>); },
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
