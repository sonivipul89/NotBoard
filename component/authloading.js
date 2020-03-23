import React from 'react';
import {
  // ActivityIndicator,
//  AsyncStorage,
  StatusBar,
  // StyleSheet,
 // Image,
} from 'react-native';


import { Spinner, StyleProvider, Container } from 'native-base'
import getTheme from "../src/theme/components"
import material from "../src/theme/variables/material"


const splashscreen = require("../assets/final1.png")

export default class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props)
  {
    super(props)
  
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');

    const userToken  = this.props.screenProps.userToken
    // console.log(userToken)
    // console.log(this.props.navigation.dangerouslyGetParent().getParam())
    //  console.log(this.props.navigation.dangerouslyGetParent().getParam("userToken"))
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken  ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Spinner />
          <StatusBar barStyle="dark-content" />
        </Container>
      </StyleProvider>
     

    );
  }
}
