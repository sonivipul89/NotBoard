import React, { Component } from 'react'
import { StyleProvider, Button, Spinner, View, Text, Container } from 'native-base';
import { ToastAndroid, ScrollView } from 'react-native'
import getTheme from "../../src/theme/components"
import material from "../../src/theme/variables/material"
import FloatingTitleTextInputField from './../floatinglable'
import AsyncStorage from '@react-native-community/async-storage';
// import { KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'
import { YellowBox } from 'react-native';

// const splashscreen = require("../assets/final4.png")


export default class FacultySignUp extends Component {
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
    FacultyName: "",
    EmailID:"",
    Password: "",
    Department:"",
    Designation:"",
    UsernameErrorStatus: false,
    PasswordErrorStatus: false,
    UsernameRef: "",
    PasswordRef: "",
    errStausForLogin: "",
    err: "",
    loginLoder: false,
    // blur:false,

  };


  _updateErrorState = (attrNameErrorState, value) => {
    this.setState({ [attrNameErrorState]: value });

  }
  updateRefState(attrNameRef, value) {
    this.setState({ [attrNameRef]: value });

  }
  _updateMasterState = (attrName, value) => {
    this.setState({ [attrName]: value })

  }

  // _handleUserToken = async () => {
  //   const Auth = firebase.auth()
  //   Auth.currentUser.getIdToken().then(async (data) => {
  //     await AsyncStorage.setItem('userToken', data)

  //   });
  // }
  _signIn = () => {
    this.props.navigation.navigate("SignUp")
  }

  _addData = async () => {
    const { EmailID ,Designation , Department ,FacultyName} = this.state
    const userToken = await firebase.auth().currentUser.getIdToken();
    const data = { [EmailID.toString()] : {"FacultyName":FacultyName,"EmailId":EmailID,"Designaion":Designation,"Department":Department,"userToken":userToken,"type":"faculty"}}
     //console.ignoredYellowBox = ['Setting a timer'];
    await firebase
     .firestore().collection("User").doc("Faculty").set(data,{ merge: true })
     .then( async () =>
        {
          console.log("Done")
        }, async err =>{
          console.log(err)
          // console.ignoredYellowBox = ['Setting a timer'];
        })
  }  
  
    _submit = async () => {
  
         const { EmailID , Password} = this.state
        //  const data = { [EmailID.toString()] : {"Enrollment":Enrollment,"StudentName":Username,"EmailId":EmailID}}
      // console.ignoredYellowBox = ['Setting a timer'];
       firebase.auth().createUserWithEmailAndPassword(EmailID,Password).then(async () => {
          //  console.log(user)
        
  
      //  this._handleUserToken()
       this._addData()
       firebase.auth().currentUser.sendEmailVerification().then(
        ()=>
        {
          ToastAndroid.showWithGravityAndOffset("User created ... plz verify user...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
          ToastAndroid.showWithGravityAndOffset("Verification mail has been sent  ...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
        }
      ) 
  //      ToastAndroid.showWithGravityAndOffset("User created ... plz verify user...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
 //      ToastAndroid.showWithGravityAndOffset("Verification mail has been sent  ...", ToastAndroid.SHORT,ToastAndroid.BOTTOM,10,20)
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
            <View style={{ alignItems: 'center', marginTop: (material.deviceHeight * .125) }} >



              {/* <KeyboardAvoidingView behavior="padding"  > */}
              {/* <View style={{marginTop: (material.deviceHeight * .15) }}> */}
              {/* <View style={{ flexDirection: 'column', marginTop: (material.deviceHeight * .40) }}> */}
              <FloatingTitleTextInputField
                attrName='FacultyName'
                title='Faculty Name '
                value={this.state.FacultyName}
                name="person"
                updateMasterState={this._updateMasterState}
                secoundIcon={false}
                secureTextEntry={false}
                updateErrorState={this._updateErrorState}
                validations={"required"}
                // blureOnSubmit={this.state.blur}
                callback={this.updateRefState.bind(this)}
                //ref={component => this.Username = component}
                // ref={this.updateRefState.bind(this)}
                otherTextInputProps={{   // here you can add other TextInput props of your choice
                  maxLength: 50,
                  keyboardType: "ascii-capable",
                  returnKeyType: "done"
                  //returnKeyLabel:"enter"

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
                validations={"required"}
                // blureOnSubmit={this.state.blur}
                callback={this.updateRefState.bind(this)}
                //ref={component => this.Username = component}
                // ref={this.updateRefState.bind(this)}
                otherTextInputProps={{   // here you can add other TextInput props of your choice
                  maxLength: 50,
                  keyboardType: "email-address",
                  returnKeyType: "done"
                  //returnKeyLabel:"enter"

                }}
              />
              <FloatingTitleTextInputField
                attrName='Department'
                title='Department'
                value={this.state.Department}
                name="person"
                updateMasterState={this._updateMasterState}
                secoundIcon={false}
                secureTextEntry={false}
                updateErrorState={this._updateErrorState}
                validations={"required"}
                // blureOnSubmit={this.state.blur}
                callback={this.updateRefState.bind(this)}
                //ref={component => this.Username = component}
                // ref={this.updateRefState.bind(this)}
                otherTextInputProps={{   // here you can add other TextInput props of your choice
                  maxLength: 50,
                  keyboardType: "ascii-capable",
                  returnKeyType: "done"
                  //returnKeyLabel:"enter"

                }}
              />
              <FloatingTitleTextInputField
                attrName='Designation'
                title='Designation'
                value={this.state.Designation}
                name="person"
                updateMasterState={this._updateMasterState}
                secoundIcon={false}
                secureTextEntry={false}
                updateErrorState={this._updateErrorState}
                validations={"required"}
                // blureOnSubmit={this.state.blur}
                callback={this.updateRefState.bind(this)}
                //ref={component => this.Username = component}
                // ref={this.updateRefState.bind(this)}
                otherTextInputProps={{   // here you can add other TextInput props of your choice
                  maxLength: 50,
                  keyboardType: "ascii-capable",
                  returnKeyType: "done"
                  //returnKeyLabel:"enter"

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
                otherTextInputProps={{   
                  maxLength: 50,
                  returnKeyType: "go"
                }}

              />
         

            </View>
          </ScrollView>
          {this.state.loginLoder ? <Spinner /> :
            <Button rounded block style={{ margin: 30 }} onPress={this._submit}>
              <Text >Sign Up</Text>
            </Button>
          }

        </Container>
      </StyleProvider>

    );
  }
}

