import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text,TextInput, View, Dimensions, TouchableOpacity, ScrollView, Button} from 'react-native';
var {height, width} = Dimensions.get('window');

import MapView from 'react-native-maps';
import {Navigator} from 'react-native-deprecated-custom-components';
import LocationButton from './map_travel_locationButton.js';
import PropTypes from 'prop-types';


export default class MapExplorer extends React.Component {

constructor(props) {

  super(props);
  this.state = {
    region: {
      latitude: 14.06911,
      longitude: 	100.60540,
      latitudeDelta: 0.007,
      longitudeDelta: 0.007
    },
    term:'',
    markers: [
      {
          latlng: {
          latitude: 14.06888,
          longitude: 100.60746

        },
        image: require('./images/pin.png'),
        title: "Sirindhorn International Institute of Technology",


      },{
        latlng: {
          latitude: 14.06894,
          longitude: 100.60596
        },
        image: require('./images/pin.png'),
        title: "Faculty of Engineering",

      },{
        latlng: {
          latitude: 14.06820,
          longitude: 100.60311
        },
        image: require('./images/pin.png'),
        title: "Faculty of Law",

      },{
        latlng: {
          latitude: 14.06801	,
          longitude: 100.60281
        },
        area:50,
        image: require('./images/pin.png'),
        title: "Faculty of Political Science",

      }
    ]
  };
  this.onRegionChange = this.onRegionChange.bind(this);
  this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
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

  render() {
    return (
      <View style={styles.container}>

      <MapView style={styles.map} ref="map" mapType='satellite' initialRegion={this.state.region} onRegionChange={this.onRegionChange}>

      {this.state.markers.map((marker, i) => {

             return (
               <MapView.Marker key={i} ref={i} coordinate={marker.latlng} title={marker.title} image={marker.image}>
                    <MapView.Callout>
                             <View style={styles.callout}>
                               <Text style={styles.calloutTitle}>{marker.title}</Text>
                             </View>
                    </MapView.Callout>
               </MapView.Marker>);
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
    backgroundColor:'#3f9155',
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
  alignItems:'center',
  padding:5
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

});
