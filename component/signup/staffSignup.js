import React, { Component } from 'react'
import { StyleProvider, Button,Spinner, View, Text, Container} from 'native-base';
import { Image, StatusBar,ToastAndroid,ScrollView } from 'react-native'
import getTheme from "../../src/theme/components"
import material from "../../src/theme/variables/material"
import FloatingTitleTextInputField from './../floatinglable'
import AsyncStorage from '@react-native-community/async-storage';
// import { KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'

import { YellowBox } from 'react-native';
// const splashscreen = require("../assets/final4.png")


export default class StaffSignUp extends Component {
  constructor(){
    super()
   //this is for yellobox error fix of "Setting a timer"
    YellowBox.ignoreWarnings(['Setting a timer']);
  }
  static navigationOptions = {
    // header: null,
    // value: "",
    // value2: "",
    // Username: "",
    // Password: ""

  };

  state = {
    Username: "",
    Password: "",
    UsernameErrorStatus: false,
    PasswordErrorStatus: false,
    UsernameRef: "",
    PasswordRef: "",
    errStausForLogin: "",
    err: "",
    loginLoder:false,
    // blur:false,

  };

  
  _updateErrorState = (attrNameErrorState, value) => {
    this.setState({ [attrNameErrorState]: value });

  }
  updateRefState(attrNameRef, value) {
    this.setState({ [attrNameRef]: value });

  }
  _updateMasterState=(attrName, value)=>{
    this.setState({[attrName]: value })
 
  }
 
//   _handleUserToken= async () =>
// {
//   const Auth = firebase.auth()
//   Auth.currentUser.getIdToken().then(async (data)=>{
//      await AsyncStorage.setItem('userToken', data)

// });
// }
_signIn = ()=>
{
  this.props.navigation.navigate("SignUp")
}
  
_addData = async () => {
  const { EmailID ,Username} = this.state
  const userToken = await firebase.auth().currentUser.getIdToken();
  const data = { [EmailID.toString()] : {"StaffPersoneName":Username,"EmailId":EmailID,"userToken":userToken,"type":"staff"}}
   //console.ignoredYellowBox = ['Setting a timer'];
  await firebase
   .firestore().collection("User").doc("Staff").set(data,{ merge: true })
   .then( async () =>
      {
        console.log("Done")
      }, async err =>{
        console.log(err)
        // console.ignoredYellowBox = ['Setting a timer'];
      })
}  

  _submit = async () => {

       const { EmailID ,Password , Username} = this.state
       
       const data = { [EmailID.toString()] : {"StaffName":Username,"EmailId":EmailID}}
    // console.ignoredYellowBox = ['Setting a timer'];
     firebase.auth().createUserWithEmailAndPassword(EmailID,Password)
     .then(async () => {
       
      // this._handleUserToken()
      this._addData()
      firebase.auth().currentUser.sendEmailVerification().then(
        ()=>
        {
          ToastAndroid.showWithGravityAndOffset("User created ... plz verify user...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
          ToastAndroid.showWithGravityAndOffset("Verification mail has been sent  ...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
        }
      ) 
      //   ToastAndroid.showWithGravityAndOffset("User created ... plz verify user...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
  //   ToastAndroid.showWithGravityAndOffset("Verification mail has been sent  ...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
    },async  error =>{
        // let o =;
       
        // console.log(error.message)
      ToastAndroid.showWithGravityAndOffset( "ERROR:"+error.message, ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)

    })
    

  }

  render() {


    return (

      <StyleProvider style={getTheme(material)}>

        <Container>
         {/* <StatusBar hidden={true}> </StatusBar> */}
          <ScrollView contentContainerStyle={{flex: 1}}   keyboardShouldPersistTaps='handled'>
              <View style={{ alignItems: 'center', marginTop: (material.deviceHeight * .2) }} >

                 <FloatingTitleTextInputField
                  attrName='EmailID'
                  title='Email Id'
                  value={this.state.EmailID}
                  name="person"
                  updateMasterState={this._updateMasterState}
                  secoundIcon={false}
                  secureTextEntry={false}
                  updateErrorState={this._updateErrorState}
                  validations={"required"}
                  // blureOnSubmit={this.state.blur}
                  callback={this.updateRefState.bind(this)}
               
                  otherTextInputProps={{   // here you can add other TextInput props of your choice
                    maxLength: 50,
                    keyboardType:  "email-address",
                    returnKeyType: "done"
                  

                  }}
                />
                <FloatingTitleTextInputField
                  attrName='Username'
                  title='Name'
                  value={this.state.Username}
                  name="person"
                  updateMasterState={this._updateMasterState}
                  secoundIcon={false}
                  secureTextEntry={false}
                  updateErrorState={this._updateErrorState}
                  validations={"required"}
                  // blureOnSubmit={this.state.blur}
                  callback={this.updateRefState.bind(this)}
               
                  otherTextInputProps={{   // here you can add other TextInput props of your choice
                    maxLength: 50,
                    keyboardType:  "email-address",
                    returnKeyType: "done"
                  

                  }}
                />
                
                <FloatingTitleTextInputField
                  attrName='Password'
                  title='Password'
                  value={this.state.Password}
                  name="lock"
                  secureTextEntry={true}
                  secoundIcon="eye"
                  updateMasterState={this._updateMasterState}
                  //  onSubmitEditing={this._updateValState}
                  validations={"required"}
                  callback={this.updateRefState.bind(this)}
                  updateErrorState={this._updateErrorState}
                  otherTextInputProps={{   // here you can add other TextInput props of your choice
                    maxLength: 50,
                    returnKeyType: "go"
                  }}

                />
                {/* </View> */}
                {/* </KeyboardAvoidingView> */}
           
              </View>
              </ScrollView>
                { this.state.loginLoder? <Spinner />:
              <Button rounded block style={{ margin: 30 }} onPress={this._submit}>
                  <Text >Sign Up</Text>
                </Button>
                }
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>New to NotBoard ?</Text>
                  <Button success block transparent  onPress={this.props.navigation.navigate("Login")} >
                    <Text>Sign Up</Text>
                  </Button>
                </View> */}


          {/* <Item rounded style={itemstyle2} > */}
          {/* <Icon name="lock" style={{ paddingBottom: 5, paddingLeft: 20,color:this.state.isFocused2 ?'#000':'#9E9E9E' }} /> */}
          {/*   <Label style={{ top:-7, left: 30,backgroundColor:'rgba(255,255,255,1)',width:material.deviceWidth*.2299,height:29}}>Username</Label> */}

          {/* <Input onFocus={this.handleFocus2} onBlur={this.handleBlur2}  */}
          {/* placeholder="Password" 
                     placeholderTextColor="#D8D8D8"
                     secureTextEntry={this.state.eye}
                      */}
          {/* /> */}
          {/* <Icon  name={!this.state.eye?"eye-off":"eye"} style={eyeicon} onPress={()=>{this.setState({ eye: this.state.eye?false:true})}} /> */}
          {/* </Item> */}







          {/* </Content> */}


      
     
          </Container>
      </StyleProvider>

    );
  }
}

