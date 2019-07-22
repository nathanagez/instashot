import React, { Component, Fragment } from "react";
import { StyleSheet, StatusBar, View, Text, Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import CameraComponent from "./components/Camera";
import { PinchGestureHandler } from "react-native-gesture-handler";

interface State {
  hasCameraPermission: string;
}

export default class App extends Component<State> {
  state = {
    hasCameraPermission: "",
    scale: 0
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  
  handleScale(ev) {
    const {width, height} = Dimensions.get("window");
    console.log("x: ", ev.nativeEvent.scale);
    
    if (ev.nativeEvent.scale > 1) {
      this.setState({scale: this.state.scale + 0.01})
    } else if (ev.nativeEvent.scale <= 1) {
      this.setState({scale: this.state.scale - 0.05});
    }
    //this.setState({scale: ev.nativeEvent.scale / 1.5});
  }

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      console.log(event.nativeEvent.scale / 1);
    }
  }

  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={(ev) => this.handleScale(ev)}
      >
        <View style={styles.container}>
          {this.state.hasCameraPermission !== "granted" ? (
            <Fragment>
              <StatusBar hidden={true} />
              <CameraComponent scale={this.state.scale}/>
            </Fragment>
          ) : (
            <Text>RIP</Text>
          )}
        </View>
      </PinchGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
