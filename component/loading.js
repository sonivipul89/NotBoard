import React,{Component} from 'react';
import {
Animated,Easing
} from 'react-native';

import Splash from '../component/splash'

// const deviceHeight = Dimensions.get('window').height;
// const deviceWidth = Dimensions.get('window').width;

import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createStackNavigator,StackViewStyleInterpolator,StackViewTransitionConfigs} from 'react-navigation-stack';
import HomeScreen from './home'
import SignUpScreen from './signup'
import AuthLoadingScreen from './authloading'
import LoginScreen from './loginScreen'
import Test from './test'
// import Left from '../src/theme/components/Left';



var nav=""


_usertoken=(value)=>{
  nav = value
  
}

export default class Loading extends Component
{
  static navigationOptions = {
    header: null,
};
constructor(props)
{
  super(props)
this.state={
        userToken : this.props.navigation.getParam("userToken")
}   

}
UNSAFE_componentWillMount()
{
   // this.nav = this.props.navigation.getParam("userToken")
    //console.log(this.nav)
   // _usertoken(this.props.navigation.getParam("userToken"))
   //console.log(this.props.navigation.getParam("userToken"))
    //  console.log(this.props.navigation.dangerouslyGetParent().getParam('userToken'))
  // console.log(nav)
}
   
  render(){
      // console.log(this.props.navigation.getParam("userToken"))
    // const userToken = this.props.navigation.getParam("userToken")
      return(      
              
       <Appnavigator screenProps={{userToken:this.props.navigation.getParam("userToken")}}/>
    )
    
  }
}

let SlideFromRight = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index-1, index],
    outputRange: [width, 0],
  })

  return { transform: [ { translateX } ] }
};

let SlideFromBottom = (index, position, height) => {
  const translateY = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [height, 0],
  })

  return { transform: [ { translateY } ] }
};

let CollapseTransition = (index, position) => {
  const opacity = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1]
  });

  const scaleY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1]
  });

  return {
    opacity,
    transform: [ { scaleY } ]
  }
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      // timing: Animated.spring,
      // stiffness: 2000,
      // damping: 500,
      // mass: 3,
      // overshootClamping: true,
      // restDisplacementThreshold: 0.01,
      // restSpeedThreshold: 0.01,
      duration: 20,
      // easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
      // easing: Easing.bezier(.5,.88,.5,.88),
      easing:Easing.out(Easing.poly(4)),
      timing: Animated.spring,
      useNativeDriver: true,
    
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const height = layout.initHeight;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        default:  SlideFromRight(index, position, width),
        bottomTransition: SlideFromBottom(index, position, height),
        collapseTransition: CollapseTransition(index, position)
      }[transition];
    },
  }
}



const AppStack = createStackNavigator({ Home: HomeScreen });
 const AuthStack = createStackNavigator({ Login:LoginScreen,SignUp: SignUpScreen },
// const AuthStack = createStackNavigator({ Login:Test,SignUp: SignUpScreen },

  {
    initialRouteName: 'Login',
    // defaultNavigationOptions:{
    //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS ,
    // },
    // mode: 'card',
    // shadowEnabled:true,
    // cardShadowEnabled:true,
    // headerMode: 'screen',
    // mode: 'card',
    //  transitionConfig:()=>StackViewTransitionConfigs.SlideFromRightIOS   //TransitionConfiguration,//()=>({screenInterpolator:CardStackStyleInterpolator.forHorizontal}),
      // transitionConfig :TransitionConfiguration
      transitionConfig:()=>({screenInterpolator:StackViewStyleInterpolator.forHorizontal})
      
  },


  
  );

 

const Appnavigator = createAppContainer(
  
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      // AuthLoading:{
      // screen: AuthLoadingScreen,
      // params: { userToken: nav},//this.props.navigation.state.params.userToken },
      // },
   },
    {
      initialRouteName: 'AuthLoading',
    },
    

  )
);




