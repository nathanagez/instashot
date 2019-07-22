import React, { Component, Fragment } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

const { width, height } = Dimensions.get("window");

interface Props {
  takePicture(): void;
  camera(): void;
  flashMode(): void;
  flashActivated: boolean;
  cameraType: Camera;
}

interface State {
  flashMode: string;
}

enum CAMERA {
  FRONT = "FRONT",
  BACK = "BACK"
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 0.1,
    backgroundColor: "rgba(34, 34, 34, 0.7)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
  }
});

export default class BottomControl extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: "flex-end"}}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.props.flashMode()}
          >
            {this.props.cameraType === Camera.Constants.Type.back ? (
              <Ionicons
                name={this.props.flashActivated ? "ios-flash" : "ios-flash-off"}
                color="white"
                size={32}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.props.takePicture()}
          >
            <Feather
              name={"camera"}
              color="white"
              size={32}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.props.camera()}
          >
            <Feather name="rotate-cw" color="white" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
