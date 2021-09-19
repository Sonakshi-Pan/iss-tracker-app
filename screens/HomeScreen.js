import React from 'react'
import{View,Text,StyleSheet,SafeAreaView,Platform,StatusBar,TouchableOpacity,Image,ImageBackground, Touchable} from "react-native"
import "react-native-gesture-handler"

export default class HomeScreen extends React.Component{

render(){
  return(
    <View style={styles.container}>
    <SafeAreaView style={styles.droidSafeArea}>
      <ImageBackground style={styles.backgroundImage}
      source={require("../assets/bg_updates.jpg")}>
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>ISS TRACKER APP</Text>
      </View>
      <TouchableOpacity style={styles.routeCard}
      onPress={()=>{this.props.navigation.navigate("IssLocation")}}>
        <Text style={styles.routeText}>ISS Location</Text>
        <Text style={styles.knowMore}>{"Know More ---->"}</Text>
        <Text style={styles.bgDigit}>1</Text>
        <Image style={styles.iconImage}
        source={require("../assets/iss_icon.png")}/>
      </TouchableOpacity>
       <TouchableOpacity style={styles.routeCard}
      onPress={()=>{this.props.navigation.navigate("Meteors")}}>
        <Text style={styles.routeText}>Meteors</Text>
        <Text style={styles.knowMore}>{"Know More ---->"}</Text>
        <Text style={styles.bgDigit}>2</Text>
        <Image style={styles.iconImage}
        source={require("../assets/meteor_icon.png")}/>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
    </View>
  )
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
          }
})