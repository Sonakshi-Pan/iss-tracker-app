import React from 'react'
import{View,Text,StyleSheet} from "react-native"
import "react-native-gesture-handler"
import{NavigationContainer} from "@react-navigation/native"
import{createStackNavigator} from "@react-navigation/stack"
import HomeScreen from "./screens/HomeScreen"
import IssLocationScreen from "./screens/IssLocationScreen"
import Meteors from "./screens/Meteors"

const Stack = createStackNavigator()

export default class App extends React.Component{

render(){
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home"
    screenOptions={{headerShown:false}}>
   <Stack.Screen name="Home" component={HomeScreen}/>
   <Stack.Screen name="IssLocation" component={IssLocationScreen}/>
   <Stack.Screen name="Meteors" component={Meteors}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

}


