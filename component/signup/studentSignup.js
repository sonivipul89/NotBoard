import React, { Component } from 'react'
import { StyleProvider, Button,Spinner, View, Text, Container} from 'native-base';
import { ScrollView ,ToastAndroid} from 'react-native'
import getTheme from "../../src/theme/components"
import material from "../../src/theme/variables/material"
import FloatingTitleTextInputField from './../floatinglable'
import AsyncStorage from '@react-native-community/async-storage';
// import { KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

 //this is for yellobox error fix of "Setting a timer"
import { YellowBox } from 'react-native';

// const splashscreen = require("../assets/final4.png")


export default class StudentSignUp extends Component {
  
constructor(){
  super()
 //this is for yellobox error fix of "Setting a timer"
  YellowBox.ignoreWarnings(['Setting a timer']);
}

  static navigationOptions = {


  };

  state = {
    Enrollment:"",
    EmailID :"",
    Username: "",
    Password: "",
    UsernameErrorStatus: false,
    PasswordErrorStatus: false,
    UsernameRef: "",
    PasswordRef: "",
    errStausForLogin: "",
    err: "",
    loginLoder:false,
    
 
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
 
_handleUserToken= async () =>
{
  const Auth = firebase.auth()
  Auth.currentUser.getIdToken().then(async (data)=>{
     await AsyncStorage.setItem('userToken', data)

});
}
_signIn = ()=>
{
  this.props.navigation.navigate("SignUp")
}
_addData = async () => {
  const { EmailID , Password ,Enrollment ,Username} = this.state
  const userToken = await firebase.auth().currentUser.getIdToken();
  const data = { [EmailID.toString()] : {"Enrollment":Enrollment,"StudentName":Username,"EmailId":EmailID,"type":"student","userToken":userToken}}
   //console.ignoredYellowBox = ['Setting a timer'];
  
   await firebase
   .firestore()
   .collection("User")
   .doc("Student")
   .set(data,{ merge: true })
   .then( async () =>
      {
        console.log("Done")
      }, async err =>{
        console.log(err)
        // console.ignoredYellowBox = ['Setting a timer'];
      })

    //  await firebase.database().ref("user")

}  

  _submit = async () => {

       const { EmailID , Password ,Enrollment ,Username} = this.state
       const data = { [EmailID.toString()] : {"Enrollment":Enrollment,"StudentName":Username,"EmailId":EmailID}}
    // console.ignoredYellowBox = ['Setting a timer'];
     firebase.auth().createUserWithEmailAndPassword(EmailID,Password).then(async () => {
      // this._handleUserToken()  
      this._addData()
      firebase.auth().currentUser.sendEmailVerification().then(
        ()=>
        {
          ToastAndroid.showWithGravityAndOffset("User created ... plz verify user...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
          ToastAndroid.showWithGravityAndOffset("Verification mail has been sent  ...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
        }
      )  
   
    
     
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
       
          <ScrollView contentContainerStyle={{flexGrow: 1}}   keyboardShouldPersistTaps='handled'>
              <View style={{ alignItems: 'center', marginTop: (material.deviceHeight * .2) }} >


                
             
                <FloatingTitleTextInputField
                  attrName='Enrollment'
                  title='Enrollment No. '
                  value={this.state.Enrollment}
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
                    keyboardType: "number-pad",
                    returnKeyType: "done"
                  

                  }}
                />
                 <FloatingTitleTextInputField
                  attrName='EmailID'
                  title='Email Id'
                  value={this.state.EmailID}
                  name="person"
                  updateMasterState={this._updateMasterState}
                  secoundIcon={false}
                  secureTextEntry={false}
                  updateErrorState={this._updateErrorState}
                  validations={"required|email"}
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
                  title='Your Name'
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
             
           
              </View>
              </ScrollView>
                { this.state.loginLoder? <Spinner />:
              <Button rounded block style={{ margin: 30 }} onPress={this._submit}>
                  <Text >Sign Up</Text>
                </Button>
                }
               
   
          </Container>
      </StyleProvider>

    );
  }
}

