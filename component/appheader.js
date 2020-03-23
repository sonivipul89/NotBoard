import React, { Component } from 'react'
import { Text,View,StyleSheet} from 'react-native'
import {Avatar,Image} from 'react-native-elements'
import {Container,Header,Left,Right,Body,Title,Icon,Button,StyleProvider} from 'native-base'
import StudentIcon from '../assets/icons/student.png'
import getTheme from "../src/theme/components"
import material from '../src/theme/variables/material'
import varibles from '../src/theme/variables/platform'

import ProfilePic from './profilePic'

// import ProfilePic from './profilePic'


export class Appheader extends Component {
    
    
    render() {
           
        return (
            
            <View style={{flex:.13,flexDirection:"row",borderBottomLeftRadius:50,borderBottomRightRadius:50,marginHorizontal:material.deviceWidth*-.01,marginTop:material.deviceHeight*-.002 , backgroundColor:"transparent",justifyContent:"center",borderBottomColor:varibles.toolbarDefaultBorder,elevation:3}}>
            {/* // <View style={{flexDirection:"row",marginTop:material.deviceHeight*-.3,width:material.deviceWidth,height:material.deviceWidth, borderRadius:200,transform:[{scaleX: 1.1}], backgroundColor:"transparent",justifyContent:"center",borderBottomColor:varibles.toolbarDefaultBorder,elevation:3}}> */}
 
 
              <Avatar              
              size="medium"
              source={require('../assets/icons/student.png')}
              title="V"
              rounded
              containerStyle={{ marginRight:15,marginTop:material.deviceHeight*(1/13)}}
           
              />
 
            <Text style={{fontSize:30,color:"#915a35",marginTop:material.deviceHeight*.05,fontFamily:"Galada-Regular"}}>Vipul's</Text>
            <Text> </Text>
            <Text style={{fontSize:30,color:"#915a35",marginTop:material.deviceHeight*.05,fontFamily:"Galada-Regular"}}>NotBoard</Text>
            

           </View>
        
        )
    }
}

export default Appheader
