import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Image,Text,TextInput, View, TouchableOpacity, ScrollView, Button} from 'react-native';


import {Navigator} from 'react-native-deprecated-custom-components';


export default class Search extends React.Component {

constructor(props) {

  super(props);
  this.state = {
    binType:null,
    binImg:null,
    itemName:null,
    term:'',
    markers: [
      {
        image: require('./images/re.png'),
        name: "glass",
        type: "Recycle",
      },{
        image: require('./images/re.png'),
        name: "paper",
        type: "Recycle",
      },{
        image: require('./images/re.png'),
        name: "metal",
        type: "Recycle",
      },{
        image: require('./images/re.png'),
        name: "plastic bottle",
        type: "Recycle",
      },{
        image: require('./images/ge.png'),
        name: "plastic bag",
        type: "General",
      },{
        image: require('./images/ge.png'),
        name: "straw",
        type: "General",
      },{
        image: require('./images/ge.png'),
        name: "tissue paper",
        type: "General",
      },{
        image: require('./images/ge.png'),
        name: "foam",
        type: "General",
      },{
        image: require('./images/ge.png'),
        name: "food plastic container",
        type: "General",
      },{
        image: require('./images/we.png'),
        name: "vegetable",
        type: "Wet",
      },{
        image: require('./images/we.png'),
        name: "food",
        type: "Wet",
      },{
        image: require('./images/we.png'),
        name: "fruit",
        type: "Wet",
      },{
        image: require('./images/we.png'),
        name: "meat",
        type: "Wet",
      },{
        image: require('./images/we.png'),
        name: "leaves",
        type: "Wet",
      },{
        image: require('./images/da.png'),
        name: "light bulb",
        type: "Danger",
      },{
        image: require('./images/da.png'),
        name: "spray can",
        type: "Danger",
      },{
        image: require('./images/da.png'),
        name: "battery",
        type: "Danger",
      }
    ]
  };

}




  render() {
    let authUI;

if (this.state.itemName!=null) {
  authUI = (
    <View>
    <View style={{alignItems:'center'}}>
    <Text style={{fontSize:18,marginTop:10,marginBottom:5}}> Item : <Text style={{color:'orange'}}>{this.state.itemName}</Text></Text>
    </View>
    <View style={{alignItems:'center'}}>
     <Image style={{width:100, height: 160 ,marginTop:10,marginBottom:10}} source={this.state.binImg} />
     </View>
    <Text style={{fontSize:16,marginTop:5}}> You should put in <Text style={{color:'orange'}}>{this.state.binType}</Text> bin</Text>
    </View>

  )
}
    return (
      <View style={styles.container}>
      <View style={styles.upper}>
      {authUI}
      </View>
    <View style={styles.footer}>
      <TextInput
         style={styles.searchBar}
         placeholder='Search material here...'
         placeholderTextColor = "#ffffff"
         onChangeText={term => this.setState({term})}
         value={this.state.term}
         />


      <ScrollView contentContainerStyle={styles.contentContainer}>
     {this.state.markers.map((marker, i)=>{
       var smallMark= marker.name.toLowerCase();
       var smallTerm= this.state.term.toLowerCase();
       if (smallMark.indexOf(smallTerm)!== -1) {
            return   <TouchableOpacity style={styles.button} key={i} name={i} onPress={() => this.setState({binType:marker.type,binImg:marker.image,itemName:marker.name})}><Text>{marker.name}</Text></TouchableOpacity>;
      }
      else if (this.state.term==''||this.state.term==null) {
          return   <TouchableOpacity style={styles.button} key={i} name={i} onPress={() => this.setState({binType:marker.type,binImg:marker.image,itemName:marker.name})}><Text>{marker.name}</Text></TouchableOpacity>;
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
    paddingTop:30,
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#f2f79b'
},
  contentContainer: {
  paddingVertical: 20
},
  footer:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f2f79b'
},
  upper:{
    paddingTop:10,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f2f79b'
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
  button:{
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#c5dd6a',
    borderColor: 'black',
    margin: 10,
    width:300
  }

});
