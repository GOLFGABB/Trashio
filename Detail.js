import React, {Component} from 'react';
import {TouchableHighlight, Image, AppRegistry,
   StyleSheet, Text, View,TouchableOpacity,Modal, ScrollView} from 'react-native';

import Chart from 'react-native-chart';

var score=0;
 var bf=0;
export default class Detail extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      modalVisible: false,
data: [[1,this.props.m1],[2, this.props.m2],[3,this.props.m3],[4, this.props.m4],[5,this.props.m5]],
price: [this.props.m1,this.props.m2,this.props.m3,this.props.m4,this.props.m5]
    }
    this.awardCal=this.awardCal.bind(this);
  }




awardCal(){
  let star = 0;
  for(let i =1;i<this.state.price.length;i++){
    if(this.state.price[i-1]-this.state.price[i]>=((this.state.price[i-1])/5)){
      star=star+1;
    }
  }
  if(star>0){
    let str=[];
for(let p=1;p<=star;p++){
  str.push(<Image
          style={{width: 50, height: 75}}
          source={{uri: 'http://vignette2.wikia.nocookie.net/criminal-case-grimsborough/images/a/a9/Gold_Medal_%28CCW_Awards%29.png/revision/latest?cb=20160101140102'}}
        />);
}
  return <View>{str}</View>;
}else{
  return <Text style={{color:'red'}}>No awards for you , try harder!</Text>;
}
}

 render() {
   let hisUI;
   if (this.state.modalVisible==true) {
     hisUI = (
       <View style={styles.container}>
       {this.state.price.map((p, i) => (
         <View style={styles.containerRec}>
         <Text style={{textAlign:'center', fontWeight:'bold' , fontSize:16, marginTop:8}}>Month# {i+1} Record</Text>
         <Text>Total Units used: {parseFloat(p/this.props.unit).toFixed(2)} units</Text>
         <Text>Unit used/area: {parseFloat((p/this.props.unit)/this.props.area).toFixed(2)} units</Text>
         <Text>Total Payment: {p} Baht</Text>
         </View>
      ) )}
      <TouchableOpacity   onPress={() => this.setState({modalVisible:false})}><Text style={styles.close}> Close</Text></TouchableOpacity>
</View>
)}



   return (
     <View style={styles.container}>
     <Modal animationType={"slide"} transparent={true} visible={this.state.modalVisible}>
       <View style={styles.modal}>
           {hisUI}
           </View>
         </Modal>

       <ScrollView >
     <View style={styles.headerName}>
       <Text style={{fontSize:18,  fontWeight:'bold', textAlign:'center'}}>
       {this.props.title}
       </Text>
       </View>
       <View style={styles.container1}>
       <Text>Historical Payment</Text>
              <View>
               <Chart
                   style={styles.chart}
                   data={this.state.data}
                   verticalGridStep={5}

                   type="bar"
                   showDataPoint={true}
                   color={['blue']}
                   tightBounds={true}
                />
                </View>
              <View>

              <Text style={styles.titleinfo}>This Month Report</Text>
              <Text>Total Units used: {parseFloat(this.props.m5 / this.props.unit).toFixed(2)} units</Text>
              <Text>Unit used/area: {parseFloat((this.props.m5/this.props.unit)/this.props.area).toFixed(2)} units</Text>
              <Text>Total Payment: {this.props.m5} Baht</Text>
              <TouchableOpacity style={styles.titleinfo}  onPress={() => this.setState({modalVisible:true})}><Text style={{color:'blue',textAlign:'center'}}> View Historical Report</Text></TouchableOpacity>
              </View>

              <View style={styles.container2}>
              <Text style={{fontWeight:'bold'}}>Outstanding Improvement Achievements</Text>
              {this.awardCal()}

              </View>
           </View>


           </ScrollView>
               </View>




   );
 }
}

let styles = StyleSheet.create({
 container:{
   flex:1,
   padding: 5,
   paddingTop:70,
   flexDirection: 'column'
 },
 container1: {

        height:300,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor: 'white',
        textAlign: 'center',
        marginTop:80
    },
    containerRec: {
      flex:1,
      margin: 5,
      padding:5,
      alignSelf: 'center',
      backgroundColor: 'lightyellow',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
      width:250
       },
    container2: {
           flex:1,
           justifyContent: 'center',
           alignItems: 'center',
           flexDirection:'column',
           backgroundColor: 'white',
           marginTop:40
       },
 chart: {
     height:300,
     width:300,
     justifyContent: 'center',
     alignItems: 'center',

 },
 headerName:{

 },
 modal: {
   flex:1,
   margin: 12,
   padding:5,
   alignSelf: 'center',
   backgroundColor: 'lightblue',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius:25,
   width:300
 },
 titleinfo:{
   fontSize:16,
   textAlign:'center',
   fontWeight:'bold',
 },
 close:{
   color:'red',
   textAlign:'center',
   fontWeight:'bold' ,
   fontSize:20,
   borderWidth:2,
   borderColor:'white',
   marginTop:15
 }


});
