import React, { Component } from "react";
import { StyleProvider } from "native-base";

import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

import Splash from "../../component/splash";

export default class Setup extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
      <Splash />
      </StyleProvider>
    );
  }
}

 // export default Setup;