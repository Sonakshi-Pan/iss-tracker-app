import axios  from 'axios'
import React from 'react'
import{View,Text,StyleSheet,Alert,FlatList,Image,ImageBackground,Dimensions,StatusBar,SafeAreaView,Platform} from "react-native"
import "react-native-gesture-handler"

export default class Meteors extends React.Component{
  constructor(){
    super()
    this.state={
      meteors:{}
    }

  }
  keyExtractor=(item,index)=>{
      index.toString()
  }
  renderItem=({item})=>{
    var meteor=item
    let bg_img,speed,size
    if (meteor.threat_score <= 30) { 
      bg_img = require("../assets/meteor_bg1.png") 
      speed = require("../assets/meteor_speed3.gif") 
      size = 100 } 
      else if (meteor.threat_score <= 75) { 
        bg_img = require("../assets/meteor_bg2.png") 
        speed = require("../assets/meteor_speed3.gif") 
        size = 150 } 
        else { bg_img = require("../assets/meteor_bg3.png") 
        speed = require("../assets/meteor_speed3.gif")
         size = 200 }
         return(
           <View>
             <ImageBackground source={bg_img}
             style={styles.backgroundImage}>
               <View style={styles.gifContainer}>
                 <Image
                      source={speed}
                      style={{alignSelf:"center",width:size,height:size}}
                 />
                 <View>
                   <Text style ={styles.cardTitle}>
                        {item.name}
                   </Text>
                   <Text style={styles.cardText}>
                     closest to earth:{item.close_approach_data[0].close_approach_date_full}
                   </Text>
                   <Text style={styles.cardText}>
                     Minimum Distance (km):{item.estimated_diameter.kilometers.estimated_diameter_min}
                   </Text>
                   <Text style={styles.cardText}>
                     Maximum Distance (km):{item.estimated_diameter.kilometers.estimated_diameter_max}
                   </Text>
                   <Text style={styles.cardText}>
                    Velocity (km/hr):{item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                   </Text>
                   <Text style={styles.cardText}>
                   Missing Earth By (km):{item.close_approach_data[0].miss_distance_kilometers}
                   </Text>
                   </View>
               </View>
             </ImageBackground>
             
           </View>
         )

  }
getMeteors=()=>{
  axios
  .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=Z63EBdce3MwqWn7e08C1L89aoKDjRI6Q0DMdQtIs")
  .then((response)=>{
    this.setState({
      meteors:response.data.near_earth_objects
    })
  })
  .catch((error)=>{
   Alert.alert(error.message) 
  })
}
componentDidMount(){
  this.getMeteors()
}

render(){
  if (Object.keys(this.state.meteors).length===0) {
  return(
    <View style={styles.container}>
    <Text >Loading....</Text>
    </View>
  )
  }else{
    let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => { 
      return this.state.meteors[meteor_date] })
       let meteors = [].concat.apply([], meteor_arr);
        meteors.forEach(function (element) { 
          let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
           let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000 
           element.threat_score = threatScore; 
           console.log(threatScore)
        })
        meteors.sort(function (a, b) { 
        return b.threat_score - a.threat_score 
      })
         meteors = meteors.slice(0, 5)
  return(
    <View style={styles.container}>
    <SafeAreaView style={styles.droidSafeArea}>
    <FlatList
    data={meteors}
    keyExtractor={this.keyExtractor}
    horizontal={true}
    renderItem={this.renderItem}
    />
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
backgroundImage: { flex: 1, resizeMode: 'cover', width: Dimensions.get('window').width, height: Dimensions.get('window').height },
gifContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
cardTitle: { fontSize: 20, marginBottom: 10, fontWeight: "bold", color: "white" }, 
cardText: { color: "white" },
})