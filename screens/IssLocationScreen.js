import axios from 'axios'
import React from 'react'
import{View,Text,StyleSheet,ImageBackground,SafeAreaView,StatusBar,Platform,Alert,Image} from "react-native"
import "react-native-gesture-handler"
import MapView,{Marker} from 'react-native-maps'

export default class IssLocationScreen extends React.Component{
  constructor(){
    super()
      this.state={
        location:{},
      }
    
  }
  getIssLocation = ()=>{
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response)=>{
        this.setState({
          location:response.data
        })
      })
      .catch((error)=>{
       Alert.alert(error.message) 
      })
  }
  componentDidMount(){
    this.getIssLocation()
  }
  

render(){
  if(Object.keys(this.state.location).length===0){
  return(
    <View style={styles.container}><Text>Loading...</Text></View>
  )
  }
  else{
  return(
    <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}>
        <ImageBackground style={styles.backgroundImage}
        source={require("../assets/iss_bg.jpg")}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>
              Iss Location Screen
            </Text>
          </View>
          <View style={styles.mapContainer}>
          <MapView style={styles.map}
          region={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta:100,
           longitudeDelta: 100,
    }}>
    <Marker coordinate={{latitude: this.state.location.latitude,longitude:this.state.location.longitude}}>
        <Image style={{height:50,width:50}}
        source={require("../assets/iss_icon.png")}/>
    </Marker>
          </MapView>
     
   
          </View>
          <View style={styles.info}>
            <Text>
              latitude:{this.state.location.latitude}
            </Text></View>
        </ImageBackground>
      </SafeAreaView>
    
    </View>

  )}
}

}
const styles=StyleSheet.create({
container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
},
droidSafeArea:{
  marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
},
    titleBar:{
      flex:0.2,
      justifyContent:"center",
      alignItems:"center",
     
    },
    titleText:{
      fontSize:30,
      fontWeight:"bold",
      color:"white"
    },
    routeCard:{
      flex:0.25,
      margin:50,
      borderRadius:30,
      backgroundColor:"white",
      },
      routeText:{
        fontSize:25,
        fontWeight:"bold",
        color:"black",
        marginTop:30,
        paddingLeft:20
      },
      knowMore:{
        fontSize:15,
        paddingLeft:20,
        color:"red"
      },
      iconImage:{
        position:"absolute",
        height:200,
        width:150,
        resizeMode:"contain",
        right:-50,
        top:-80
      },
      bgDigit:{
        position:"absolute",
        fontSize:100,
        right:20,
        bottom:-15,
        zIndex:-1,
        color:"rgba(183,183,183,0.5)"
      },
      backgroundImage:{
        flex:1,
        resizeMode:"cover",
        width:400
     },
     mapContainer:
      { flex: 0.7 }, 
      map:
       { width: "100%", height: "100%" },
       info:{
        flex:0.2,
        backgroundColor:"white",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        padding:20
       }


})