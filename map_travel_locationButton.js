import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';

export default class LocationButton extends Component {
  render(){
    return (
      <TouchableOpacity style={styles.button} onPress={()=>
        this.props.moveMaptoLocation({latitude: this.props.marker.latlng.lat,longitude: this.props.marker.latlng.lng}, this.props.name)}>
        <Text>{this.props.marker.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderColor: 'black',
    margin: 10
  }
});
