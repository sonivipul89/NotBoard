import React, { Component } from 'react'
import { View,Button,AsyncStorage} from 'react-native'

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
           
    );
  }
}



