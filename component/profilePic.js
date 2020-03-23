import React, { Component } from 'react'
import { Text, View ,Image } from 'react-native'
import material from '../src/theme/variables/material'
import Profile from '../assets/icons/student.png'
export class ProfilePic extends Component {
    render() {
        return (
            <View>
                <Image source={Profile} style={{borderRadius:30,height:material.deviceHeight*0.07,width:material.deviceWidth*.1}}></Image>
            </View>
        )
    }
}

export default ProfilePic
