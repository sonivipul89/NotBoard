import React, { Component } from "react";
import { Image,View , Text , StatusBar } from "react-native";
import { Container , Content, Button } from "native-base";

import styles from "./styles";
const splashscreen = require("../../../assets/launchscreen-bg.png");


export default class SplashPage extends Component {
  render() {
    // eslint-disable-line class-methods-use-this
    return (
        <Container>
            <StatusBar hidden={true}/>
              <Image
                source={splashscreen}
                style={styles.imageContainer} />
       

     
        </Container>

    );
  }
}

