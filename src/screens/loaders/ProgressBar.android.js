import React, { Component } from "react";
import {ProgressBarAndroid} from 'react-native';
// import ProgressBar from "ProgressBar";


export default class SpinnerNB extends Component {
  prepareRootProps() {
    const type = {
      height: 40
    };

    const defaultProps = {
      style: type
    };

    return computeProps(this.props, defaultProps);
  }

  render() {
    const getColor = () => {
      if (this.props.color) {
        return this.props.color;
      } else if (this.props.inverse) {
        return this.getTheme().inverseProgressColor;
      }

      return this.getTheme().defaultProgressColor;
    };

    return (
      // { <ProgressBar
      //   {...this.prepareRootProps()}
      //   styleAttr="Horizontal"
      //   indeterminate={false}
      //   progress={this.props.progress ? this.props.progress / 100 : 0.5}
      //   color={getColor()}
      // /> }
      <ProgressBarAndroid styleAttr="Horizontal" />
    );
  }
}


// import React, {Component} from 'react';
// import {ProgressBarAndroid, StyleSheet, View} from 'react-native';

// export default class SpinnerNB  extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <ProgressBarAndroid />
//         <ProgressBarAndroid styleAttr="Horizontal" />
//         <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
//         <ProgressBarAndroid
//           styleAttr="Horizontal"
//           indeterminate={false}
//           progress={0.5}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//     padding: 10,
//   },
// });