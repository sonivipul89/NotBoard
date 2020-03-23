import React, { Component, } from 'react'
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Button,Footer,FooterTab,Text } from 'native-base'
// import material from '../src/theme/variables/material'


export class Appfooter extends Component {

    constructor() {
        super()
        this.state = {
            animation: new Animated.Value(0),
        }
    }


    _toggleAnimation = () => {
        const toValue = this._tmp ? 0 : 1
        Animated.spring(this.state.animation, {
            toValue,
            duration: 200,
            useNativeDriver: true
        }).start();

        this._tmp = !this._tmp
    }


    render() {

        const scaleInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30],

        });
        const bgStyle = {
            transform: [
                {
                    scale: scaleInterpolate,
                },
            ],
        };

        const iconRotateInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg'],

        });
        const buttonInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -75],

        });
        const leftbuttonInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 20],

        });
        const centerbuttonInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -55],

        });
        const btnscaleInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],

        });

        const iconRotate = {
            transform: [
                {
                    rotate: iconRotateInterpolate,
                },
            ]
        }
        const btn = {
            transform: [
                {
                    translateY: buttonInterpolate,
                },
                {
                    scale: btnscaleInterpolate
                }
            ],
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            bottom: 22,
            right: 30,
            borderRadius: 30,
            backgroundColor: "#ddd",

        };

        const leftbtn = {
            transform: [
                {
                    translateX: buttonInterpolate,
                },
                {
                    translateY: leftbuttonInterpolate
                },
                {
                    scale: btnscaleInterpolate
                }
            ],
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            bottom: 22,
            right: 30,
            borderRadius: 30,
            backgroundColor: "#ddd",

        };

        const centerbtn = {
            transform: [
                {
                    translateX: buttonInterpolate,
                },
                {
                    translateY: centerbuttonInterpolate
                },
                {
                    scale: btnscaleInterpolate
                }
            ],
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            bottom: 22,
            right: 30,
            borderRadius: 30,
            backgroundColor: "#ddd",

        };

        return (
            <View style={[styles.container]}>
                <Animated.View style={[styles.background, bgStyle]} />
                <TouchableOpacity style={styles.fab_Buttons, btn}>
                    {/* <Animated.View > */}
                    <Icon name="add" style={styles.icon} />
                    {/* </Animated.View> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.fab_Buttons, leftbtn}>
                    {/* <Animated.View > */}
                    <Icon name="add" style={styles.icon} />
                    {/* </Animated.View> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.fab_Buttons, centerbtn}>
                    {/* <Animated.View > */}
                    <Icon name="add" style={styles.icon} />
                    {/* </Animated.View> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this._toggleAnimation}>
                    <Animated.Text style={iconRotate}> <Icon name="add" style={styles.icon} /> </Animated.Text>
                </TouchableOpacity>                
            </View>


        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 20,
        right: 20,
        borderRadius: 30,
        backgroundColor: "rgba(0,0,0,.2)",
    },
    fab_Buttons: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        bottom: 20,
        right: 20,
        borderRadius: 30,
        backgroundColor: "#EEE"
    },
    button: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        bottom: 20,
        right: 20,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: "#c1501d",
    },
    icon: {
        color: "#fff"
    }
})




export default Appfooter
