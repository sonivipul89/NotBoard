import React, { Component } from 'react'
import { Image, StatusBar, ProgressBarAndroid, Dimensions } from 'react-native'
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container,Text } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import Loading from "./loading";

import styles from "./style"
const splashscreen = require("../assets/sp1.png")

// const SplashStack = createStackNavigator({ Splash: Splash });
// const LoadStack = createStackNavigator({ Loading: Loading });

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCdDvH_Rzh0f059d4hc38qn0B8vbMvgNT0",
  authDomain: "notboard-56f1d.firebaseapp.com",
  databaseURL: "https://notboard-56f1d.firebaseio.com",
  projectId: "notboard-56f1d",
  storageBucket: "notboard-56f1d.appspot.com",
  messagingSenderId: "10698272704",
  appId: "1:10698272704:web:91f43918f0841b07ca2225",
  measurementId: "G-H8VJP27W5E"
};

firebase.initializeApp(firebaseConfig)

class Splash extends Component {
  static navigationOption ={
    header: null,
  }
    state = { count: 0};
    componentDidMount() {
      // this.props.navigation.navigate('App')
            // let intID;
            this.bootstrapAsync()

            //     intID = setInterval(() => {
            //         if(this.state.count>=1)
            //         {
            //               clearInterval(intID);
            //                 this.bootstrapAsync()
            //               // console.log(userToken)
            //               // this.props.navigation.navigate('App',{userToken:userToken})
            //            //  this.render()= <Loading />   
                           
            //           //  this.props.navigation.setParams({ userToken: 'false' })
            //          //  this.props.navigation.navigate('Load',{ userToken: 'false' })

            //         }else{
                      
            //                 this.setState({ count: parseFloat(this.state.count) + .01 });
            //         }
            //     }, .39);
            
            
    }


    bootstrapAsync = async () => {
      //  await AsyncStorage.setItem('userToken',(false).toString())
      const userToken = await AsyncStorage.getItem('userToken');
      // this.props.navigation.setParams({ userToken: 'false' })
      this.props.navigation.navigate('Load',{ userToken: userToken })
      //  const userToken  = this.props.navigation.dangerouslyGetParent().getParam('userToken');
      //  console.log(userToken)
      //  return userToken
      }

    render() {
    


        return (
            <Container>
                <StatusBar hidden={true} />

                <Image
                    source={splashscreen}
                    style={styles.imageContainer} />

                <ProgressBarAndroid styleAttr={"Horizontal"}
                    //indeterminate={false}
                    //progress={this.state.count}
                    style={{ color: '#8f8f8f', backgroundColor: "#d8d9d900", position: "absolute", marginLeft: deviceWidth - 290, marginTop: deviceHeight - 150, width: 240 }} />

                
             

            </Container>
        ) 
    }
}


const Appnavigator = createAppContainer(
    createSwitchNavigator(
      {
        Splash: Splash,
        Load: Loading,
      },
      {
        initialRouteName: 'Splash',
      }
    )
  );
  
  
export default Appnavigator
  