import * as firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD1KkQ_Pq8lBALlgP-HUwQxmxGHuyhSSlw",
    authDomain: "fir-02-72a3b.firebaseapp.com",
    databaseURL: "https://fir-02-72a3b.firebaseio.com",
    projectId: "fir-02-72a3b",
    storageBucket: "fir-02-72a3b.appspot.com",
    messagingSenderId: "784916233609"
  };
/*
  var FbApp = firebase.initializeApp(config);
  module.exports.FBApp = FbApp;*/

var FbApp = firebase.initializeApp(config);
module.exports.FBApp = FbApp.database();
