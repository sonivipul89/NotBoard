import React, { Component } from 'react'
import { StyleProvider, Button,Spinner, View, Text, Container, } from 'native-base';
import { Image, StatusBar, ScrollView } from 'react-native'
import getTheme from "../src/theme/components"
import material from "../src/theme/variables/material"
import FloatingTitleTextInputField from './floatinglable'
import AsyncStorage from '@react-native-community/async-storage';
// import { KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'


const splashscreen = require("../assets/final4.png")


export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
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

  // handleFocus1 = () => this.setState({ isFocused1: true });
  // handleBlur1 = () => this.setState({ isFocused1: false });
  // handleFocus2 = () => this.setState({ isFocused2: true });
  // handleBlur2 = () => this.setState({ isFocused2: false });
  _updateErrorState = (attrNameErrorState, value) => {
    this.setState({ [attrNameErrorState]: value });
    //console.log(this.state.UsernameErrorStatus)
    // console.log("okk")
  }
  updateRefState(attrNameRef, value) {
    this.setState({ [attrNameRef]: value });

  }
  _updateMasterState=(attrName, value)=>{
    this.setState({[attrName]: value })
    // console.log(this.state.Username)
  }
  // inputBlur= async () =>
  //  {
  //     this.state.UsernameRef.blur();
  //     this.state.PasswordRef.blur();
  //     return true;
  //  }

_handleLogin= async () =>
{
  const Auth = firebase.auth()
  Auth.currentUser.getIdToken().then(async (data)=>{
     await AsyncStorage.setItem('userToken', data)
   //  console.log(await AsyncStorage.getItem('userToken'))    
});
}
_signIn = ()=>
{
  this.props.navigation.navigate("SignUp")
}
  
  _submit = async () => {

    // this._submitFieldBlur;
    // this._login;
    this.setState({loginLoder:true})
    // await this.inputBlur()
    this.state.UsernameRef.blur();
    this.state.PasswordRef.blur();
 



    const { UsernameErrorStatus, PasswordErrorStatus } = this.state
    //  console.log(UsernameErrorStatus );


    if (UsernameErrorStatus && PasswordErrorStatus) {

      

      const { Username, Password } = this.state
      // here i am trying to login
      
      firebase.auth().signInWithEmailAndPassword(Username,Password)
          .then(  () =>{
          if(firebase.auth().currentUser.emailVerified)
          {
            this._handleLogin()
            this.setState({loginLoder:false})
            this.props.navigation.navigate("Home")
          }else{
            firebase.auth().currentUser.sendEmailVerification().then(()=>
            {
              alert("Email ID Is not Verified\nPlz Verify Email First...")
              this.setState({loginLoder:false}) 
            },err =>{
              alert("error while sending verification email")
              console.log(err)
              this.setState({loginLoder:false}) 
            })
           
          }      
          
            // const userToken = ;
           // console.log(user.getToken())
           
         //  alert('login')
          },(error)=>{
            this.setState({loginLoder:false})  
            alert(error)
          })
      
      
      //.then((status =>this.setState({errStausForLogin:status}))
        //  .catch(err => this.setState({err:err}))
      // console.log(this.state.errStausForLogin)
      // console.log(this.state.err)
      //  await AsyncStorage.setItem('email',this.state.Username)
      //  await AsyncStorage.setItem('pass',this.state.Password) 
      // alert("Login");
    }
    else {

      alert("Invalid Credentials....");
      this.setState({loginLoder:false})  


    }

  }

  render() {


    return (

      <StyleProvider style={getTheme(material)}>

        <Container>

          {/* <Content> */}
          <StatusBar hidden={true}> </StatusBar>

          {/*                   <Item rounded floatingLabel style={itemstyle1} >
                   <Icon active name="person" style={{ paddingBottom: 5, paddingLeft: 20, color:this.state.isFocused1 ?'#000':'#9E9E9E' }} />
                      <Label style={{ top:-7, left: 30,backgroundColor:'rgba(255,255,255,1)',width:material.deviceWidth*.2299,height:29}}>Username</Label>  
              
                    {/* <Input onFocus={this.handleFocus1} onBlur={this.handleBlur1} placeholder="Username" placeholderTextColor="#D8D8D8" /> */}
          {/* </Item> */}


          <ScrollView contentContainerStyle={{flexGrow: 1}}   keyboardShouldPersistTaps='handled'>

              <View style={{ alignItems: 'center', marginTop: (material.deviceHeight * .2) }} >
                <Image
                  style={{
                    //position: "absolute",
                    margin: (material.deviceHeight * .05),
                    width: (material.deviceWidth * .57) % 493, height: (material.deviceHeight * .223) % 359
                  }}
                  source={splashscreen}
                />


                
                 {/* <KeyboardAvoidingView behavior="padding"  > */}
                {/* <View style={{marginTop: (material.deviceHeight * .15) }}> */}
                {/* <View style={{ flexDirection: 'column', marginTop: (material.deviceHeight * .40) }}> */}
                <FloatingTitleTextInputField
                  attrName='Username'
                  title='example@mail.com'
                  value={this.state.Username}
                  name="person"
                  updateMasterState={this._updateMasterState}
                  secoundIcon={false}
                  secureTextEntry={false}
                  updateErrorState={this._updateErrorState}
                  validations={"email|required"}
                  // blureOnSubmit={this.state.blur}
                  callback={this.updateRefState.bind(this)}
                  //ref={component => this.Username = component}
                  // ref={this.updateRefState.bind(this)}
                  otherTextInputProps={{   // here you can add other TextInput props of your choice
                    maxLength: 50,
                    keyboardType:  "email-address",
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
                  otherTextInputProps={{   // here you can add other TextInput props of your choice
                    maxLength: 50,
                    //keyboardType: "web-search",
                    returnKeyType: "go"
                  }}

                />
                {/* </View> */}
                {/* </KeyboardAvoidingView> */}
           
              </View>
              </ScrollView>
                { this.state.loginLoder? <Spinner />:
              <Button rounded block style={{ margin: 30 }} onPress={this._submit}>
                  <Text >Log In</Text>
                </Button>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>New to NotBoard ?</Text>
                  <Button success block transparent  onPress={this._signIn} >
                    <Text>Sign Up</Text>
                  </Button>
                </View>


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

