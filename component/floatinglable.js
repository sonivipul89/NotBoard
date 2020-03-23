import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'native-base'
import { string, func } from 'prop-types';
// import { Form, TextValidator } from 'react-native-validator-form';
// import firebase from 'react-native-firebase'


export default class Floatinglabel extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    // value: string.isRequired,
    updateErrorState: func.isRequired,
    keyboardType: string,
    // ref:string,
    // validations : object
    // otherTextInputProps: object,
  }
// componentDidMount(){
//   // this.props.ref(this._textinput);
//   console.log(this._textinput)
// }
  static defaultProps = {
    keyboardType: 'default',
    otherTextInputAttributes: {},
    validations: false
  }


  constructor(props) {
    super(props);
    const { value, name, secureTextEntry, secoundIcon, validations } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      eye: true,
      secureTextEntry: this.props.secureTextEntry,
      err: false,
      errMessage: null,
      values: this.props.value
    }
  }

componentDidMount()
{
  this._ref()
}

 //for animation
  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 100,
      }).start();
    }
  }
  //for animation
  _handleBlur = () => {
    if (this.state.isFieldActive && !this.state.values) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 100,
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { attrName, updateMasterState } = this.props;
    updateMasterState(attrName, updatedValue);
       
    this.setState({ values: updatedValue })
    // console.log(this.state.values);
  }
  _passHide = () => {
    this.setState({ eye: this.state.eye ? false : true })

    this.state.secureTextEntry = !this.state.eye

  }
 _ref = () =>
{
  const { attrName }= this.props
  // console.log(ref)
 this.props.callback(attrName+"Ref",this._textinput);
}

  _login_button_activate=(errStatus)=>
  {
     const { attrName, updateErrorState } = this.props;
     updateErrorState(attrName+"ErrorStatus", errStatus);
    //console.log(updatedValue) 
  }

  
  _returnAnimatedBorderStyles = () => {
    const { isFieldActive, err } = this.state;
    if (err === false) {
      return {
        // elevation: this.position.interpolate({
        //   inputRange: [0, 1],
        //   outputRange: [0, 2],
        // }),
        borderColor: this.position.interpolate({
          inputRange: [0, 1],
          outputRange: ['#aaa', '#1976d2'],
        }),
      }
    }
    else {
      return {
        // elevation: this.position.interpolate({
        //   inputRange: [0, 1],
        //   outputRange: [0, 2],
        // }),
        borderColor: this.position.interpolate({
          inputRange: [0, 1],
          outputRange: ['#aaa', '#ff0000b8'],
        }),
      }

    }
  }
  _returnAnimatedTitleStyles = () => {
    const { isFieldActive, err } = this.state;
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -18],
      }),
      //    fontSize: isFieldActive ? 13 : 20,
      //      color: isFieldActive ? 'gray' : '#555',

      fontSize: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 12],
      }),
      color: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [err ? '#ff0000b8' : '#aaa', err ? '#ff0000b8' : '#1976d2'],
      }),
      backgroundColor: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff00', '#fff'],
      }),


    }
  }

  _validate = (values) => {

    if (this.props.validations != "none") {

      let val = this.props.validations
      val = val.split("|")
      let tmp_val=[]
      //giving priority to validations
      for(let x=0;x<val.length;x++){
        
        if(val[x]==="required")
        {
           tmp_val[0]="required"
        }else if(val[x]==="email")
        {
            tmp_val[1]="email"
        }
    }
    val = tmp_val;

      // const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      for (let x = 0; x < val.length; x++) {
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
       
        if (val[x] === "required") {
             if (values === "") {
              this.setState({ err: true })
              this.setState({ errMessage: "Required field" })
              this._login_button_activate(false)
              break;
             }else{
              this.setState({ err: false });
              this.setState({ errMessage: "" });
              this._login_button_activate(true)
             }
          }
        else if (val[x] === "email") {
          if (re.test(values) === false) {
            //Email validation
            this.setState({ err: true })
            this.setState({ errMessage: "Invalid Email" })
            this._login_button_activate(false)
            break;
          }else
          {
            this.setState({ err: false });
            this.setState({ errMessage: "" });
            this._login_button_activate(true);
          }

        }
        else {
          this.setState({ err: false });
          this.setState({ errMessage: "" });
        }
      }
   }
  }



    render() {
      const Styles = {

        container: {
          flexDirection: 'column',
          width: '80%',
          borderRadius: 30,
          borderStyle: 'solid',
          borderWidth: .5,
          height: 50,
          marginVertical: '3%',
          marginHorizontal: '10%',
          // elevation:3,
          // backgroundColor: '#eee,
          // shadowColor: '#ff0000b8'
        },
        textInput: {
          fontSize: 15,
          // elevation:3,
          // marginTop: 0.5,
          justifyContent: 'center',
          fontFamily: 'Avenir-Medium',
          color: '#455a64',
          zIndex: 1,
          // backgroundColor: '#fff',
          // marginVertical: '-5%',
          marginHorizontal: '12.5%'

        },
        titleStyles: {
          position: 'absolute',
          fontFamily: 'Avenir-Medium',
          marginTop: '3%',
          backgroundColor: '#fff',
          // left: 5,
          // top:30,
          left: 40,
        },
        IconStyles: {
          position: 'absolute',
          fontFamily: 'Avenir-Medium',
          marginTop: '4%',
          fontSize: 20,
          color: this.state.err ? '#ff0000b8' : this.state.isFieldActive ? '#1976d2' : '#555',
          // elevation: 5,
          // backgroundColor: '#fff',
          // left: 0,
          // top:30,
          left: '4%',
        },
        IconStyles2: {
          position: 'absolute',
          fontFamily: 'Avenir-Medium',
          marginTop: '4.6%',
          fontSize: 20,
          color: this.state.isFieldActive ? '#1976d2' : '#555',
          // elevation: 5,
          // backgroundColor: '#fff',
          // left: 0,
          // top:30,
          left: '88%',
        }
      }

      return (
        <Animated.View style={[Styles.container, this._returnAnimatedBorderStyles()]}>
          <Animated.Text
            style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
          >

            {this.state.err ? this.state.errMessage : this.props.title}
          </Animated.Text>

          <TextInput
            value={this.props.value}
            style={Styles.textInput}
            underlineColorAndroid='transparent'
            onFocus={this._handleFocus}
            onBlur={() => { this._handleBlur(), this._validate(this.state.values) }}
            onChangeText={(value)=>this._onChangeText(value)}
            keyboardType={this.props.keyboardType}
            secureTextEntry={this.state.secureTextEntry}
            //ref={this.props.ref}
            ref={input => this._textinput=input}
            //returnKeyType='next'
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={true}
          //  maxLength={50}
            // keyboardType="email-address"



           {...this.props.otherTextInputProps}
          />
          <Icon active name={this.state.err ? 'alert' : this.props.name} style={[Styles.IconStyles]} />
          {this.props.secoundIcon ? <Icon active name={!this.state.eye ? "eye-off" : "eye"}  style={[Styles.IconStyles2]} onPress={this._passHide} /> : null}
        </Animated.View>
      )




    }
  }










