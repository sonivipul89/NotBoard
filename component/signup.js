import React, { Component } from 'react'
import {  View, StatusBar, StyleSheet, Text} from 'react-native'
import { Container, StyleProvider ,Spinner } from 'native-base'
import getTheme from "../src/theme/components"
import material from "../src/theme/variables/material"
// import components from '../src/theme/components'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { Image } from 'react-native-elements';

// import Student from './studentSignup'

import FacultyIcon from '../assets/icons/faculty-focused.png'
import FacultyIconFocused from '../assets/icons/faculty-focused1.png'
import StudentIconFocused from '../assets/icons/student-focused.png'
import StudentIcon from '../assets/icons/student.png'
import StaffIconFocused from '../assets/icons/staff-focused1.png'
import StaffIcon from '../assets/icons/staff.png'
// import {FloatingLable} from './floatinglable'

import Student from './signup/studentSignup'
import Staff from './signup/staffSignup'
import Faculty from './signup/facultySignup'


// class Staff extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
//         <Text>Staff!</Text>
//       </View>
//     );
//   }
// }

// class Faculty extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
//         <Text>Faculty!</Text>
//       </View>
//     );
//   }
// }






// import {BlurView} from '@react-native-community/blur'
export default class SignInScreen extends React.Component {
  
// UNSAFE_componentWillMount()
// {
//      return <TabNavigator />
// }



  static navigationOptions = {
    // header:null
    // // headerTransparent: true,
    // // headerLayoutPreset: 'center'
    headerStyle: {
      backgroundColor: material.brandPrimary,
    },
    headerTintColor: material.brandLight,
    headerTitleAlign: "center",
    // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    lazy: true,
    headerTitleStyle: {
      //  color:"white",
      //  fontFamily:"OpenSans",
      //  alignSelf: 'center' ,
      // textAlign: 'center',
      // backgroundColor:material.brandPrimary,
      // color:material.brandLight,
      fontSize: 20,
      fontWeight: 'bold',
      // marginLeft:'30%',
      flex: 1
    },
    title: 'Sign Up',

  };

 
  render() {
   return (
    <StyleProvider style={getTheme(material)}>

    <Container>

      {/* <Content> */}
      <StatusBar hidden={true}> </StatusBar>
          <TabNavigator />
      </Container>
      </StyleProvider>
    );

  }


}
//customizing my tabbar
// const TabBarComponent = props => <BottomTabBar {...props} />;

const TabNavigator = createAppContainer(createBottomTabNavigator({
  Student: Student,
  Staff: Staff,
  Faculty: Faculty,
},
  {
    initialRouteName: 'Student',
    //  navigationOptions:{
    backBehavior:"none",
    defaultNavigationOptions: ({ navigation }) => ({
      // tabBarAccessibilityLabel: "hello",
      // tabBarIcon: ({ focused, horizontal, tintColor }) => {
      //   const { routeName } = navigation.state;
      //   // let IconComponent = Ionicons;
      //   let iconName;
      //   if (routeName === 'Admin') {
      //     iconName = !focused
      //       ? 'account-key-outline'
      //       : 'account-key';
      //     // Sometimes we want to add badges to some icons.
      //     // You can check the implementation below.
      //     // IconComponent = HomeIconWithBadge;
      //   } else if (routeName === 'Student') {
      //     iconName = !focused ?  'account-group-outline' :'account-group' ;
      //   }else if (routeName === 'Staff') {
      //     iconName = !focused ?  'account-multiple-outline' :'account-multiple' ;
      //   }

      //   // You can return any component that you like here!
      //   return <Icon name={iconName} size={25} type="MaterialCommunityIcons" color={tintColor} />;
      // },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // let IconComponent = Ionicons;
        let iconName;

        if (routeName === 'Faculty') {
          iconName = !focused ? <Image
          source={ FacultyIconFocused }
          style={{ width: 20, height: 20 }}
          // PlaceholderContent={<Spinner />}
        />
        : 
        <Image
          source={ FacultyIcon }
          style={{ width: 20, height: 20 }}
          // PlaceholderContent={<Spinner />}
        />

        }else if(routeName === 'Student')
        {
          iconName = !focused ? <Image
          source={ StudentIconFocused }
          style={{ width: 20, height: 20 }}
          // PlaceholderContent={<Spinner />}
        />
        : 
        <Image
          source={ StudentIcon }
          style={{ width: 20, height: 20 }}
          // PlaceholderContent={<Spinner />}
        />
        }else 
        {
          iconName = !focused ? <Image
          source={ StaffIconFocused }
          style={{ width: 20, height: 20 }}
          // PlaceholderContent={<Spinner />}
        />
        : 
        <Image
          source={ StaffIcon }
          style={{ width: 20, height: 20 }}
          // PlaceholderContent={<Spinner />}
        />
        }
        // if (routeName === 'Faculty') {
        //   // iconName = 'stu-outlined'
        //   iconName = focused ? <FacultyIconFocused width="30" height="30" fill={tintColor} />:<FacultyIcon width="25" height="25" fill={tintColor} />
        //   // Sometimes we want to add badges to some icons.
        //   // You can check the implementation below.
        //   // IconComponent = HomeIconWithBadge;
        // } else if (routeName === 'Student') {
        //   // iconName = 'stu-outlined'
        //   iconName = focused ? <StudentIconFocused width="30" height="30" fill={tintColor} />:<StudentIcon width="25" height="25" fill={tintColor} />
        // } else if (routeName === 'Staff') {
        //   // iconName = 'stu-outlined'
        //   iconName = focused ? <StaffIconFocused width="30" height="30" fill={tintColor} />:<StaffIcon width="25" height="25" fill={tintColor} />
        // }

        // You can return any component that you like here!
        // return <Icon name={iconName} size={20}  color={tintColor} />;
        return iconName
      },

    }),
    tabBarOptions: {
      activeBackgroundColor: '#fff',
      inactiveBackgroundColor: material.brandLight,
      activeTintColor: material.brandPrimary,
      inactiveTintColor: '#9B9B9B',
      showLabel: true,
      tabStyle: {
        //  bordertopRadius:360,
        //  borderTopEndRadius:5,
        // borderTopStartRadius:5,

        borderBottomEndRadius: 18,
        borderBottomStartRadius: 18,
        borderStyle: "dashed",


        //  padding:10,
        //    backgroundColor: material.brandLight,    //"#f5f5f5",
        //   //  borderWidth:5,
        // //    borderColor:material.brandLight,
        //    borderTopColor:"#fff",
        // //    borderStyle:"solid",
      },
      style: {
        // borderRadius:30,
        backgroundColor: material.brandLight,
        borderTopColor: "#fff",
      },
      // labelStyle: {
      //   // borderTopEndRadius:30,
      //   // borderTopStartRadius:30,
      //   // backgroundColor:"#f5f5f5",
      //   // borderTopColor:"#fff",
      //   fontSize: material.fontSizeH3,
      // },



    },

  }

))





















// import React, { Component } from 'react'
// import {  KeyboardAvoidingView,View,StatusBar,StyleSheet} from 'react-native'
// import { Container,StyleProvider, Header, Title, Content, Button, Icon, Left, Body, Text,Right } from 'native-base'
// import getTheme from "../src/theme/components"
// import material from "../src/theme/variables/material"
// // import {BlurView} from '@react-native-community/blur'
// export default class SignInScreen extends React.Component {

//   static navigationOptions = {
//         header:null
//       // // headerTransparent: true,
//       // // headerLayoutPreset: 'center'

//       // headerTitleStyle : {
//       // //  color:"white",
//       // //  fontFamily:"OpenSans",
//       //  //  alignSelf: 'center' ,
//       //   // textAlign: 'center',
//       //   marginLeft:'30%',
//       //   flex:1
//       // },
//       // title:'hello',

//   };



//   render() {
//     return (
//       <StyleProvider style={getTheme(material)}>
//     <Container >
//     <StatusBar hidden={false}/>
//         <Header>
//           <Left>
//             <Button  rounded style={{marginLeft:-5,elevation:0}} >
//               <Icon  name="arrow-round-back" />
//             </Button>
//           </Left>
//           <Body >
//             <Title> Sign Up</Title>
//           </Body>
//           {/* <Right>
//             <Button transparent>
//               <Text>Cancel</Text>
//             </Button>
//           </Right> */}
//         </Header>
//         <Content padder>
//           <Text>
//             Header with transparent prop
//           </Text>
//         </Content>
//       </Container>
//       </StyleProvider>
//     )

//   }


// }



















// import React, { Component } from 'react'
// import {  KeyboardAvoidingView,View,StatusBar,StyleSheet} from 'react-native'
// import { Container,StyleProvider, Header, Title, Content, Button, Icon, Left, Body, Text,Right } from 'native-base'
// import getTheme from "../src/theme/components"
// import material from "../src/theme/variables/material"
// // import {BlurView} from '@react-native-community/blur'
// export default class SignInScreen extends React.Component {

//   static navigationOptions = {
//         header:null
//       // // headerTransparent: true,
//       // // headerLayoutPreset: 'center'
      
//       // headerTitleStyle : {
//       // //  color:"white",
//       // //  fontFamily:"OpenSans",
//       //  //  alignSelf: 'center' ,
//       //   // textAlign: 'center',
//       //   marginLeft:'30%',
//       //   flex:1
//       // },
//       // title:'hello',
       
//   };



//   render() {
//     return (
//       <StyleProvider style={getTheme(material)}>
//     <Container >
//     <StatusBar hidden={false}/>
//         <Header>
//           <Left>
//             <Button  rounded style={{marginLeft:-5,elevation:0}} >
//               <Icon  name="arrow-round-back" />
//             </Button>
//           </Left>
//           <Body >
//             <Title> Sign Up</Title>
//           </Body>
//           {/* <Right>
//             <Button transparent>
//               <Text>Cancel</Text>
//             </Button>
//           </Right> */}
//         </Header>
//         <Content padder>
//           <Text>
//             Header with transparent prop
//           </Text>
//         </Content>
//       </Container>
//       </StyleProvider>
//     )

//   }


// }

