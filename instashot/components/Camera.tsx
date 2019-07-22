import React, { Component } from "react";
import { View } from "react-native";
import { Camera } from "expo-camera";
import Lottie from "lottie-react-native";
import ImagePreview from "./ImagePreview";
import BottomControl from "./BottomControl";
import * as ImageManipulator from 'expo-image-manipulator';

interface State {
  type: any;
  photo: any;
  captured: boolean;
  flashActivated: boolean;
  flashMode: string;
  uploaded: boolean;
}

export default class CameraComponent extends Component<State> {
  camera = null;
  state: State = {
    type: Camera.Constants.Type.back,
    photo: null,
    captured: false,
    flashActivated: false,
    flashMode: "off",
    uploaded: false
  };

  async takePicture() {
    const photo = await this.camera.takePictureAsync({ skipProcessing: true });
    if (this.state.type === Camera.Constants.Type.front) {
      const manipResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ flip: ImageManipulator.FlipType.Horizontal }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      this.setState({ photo: manipResult, captured: true });
    } else {
      this.setState({ photo: photo, captured: true });
    }   
  }

  handlePreview(state: boolean): void {
    this.setState({ captured: false, uploaded: state });
  }

  handleCameraType(): void {
    if (this.state.type === Camera.Constants.Type.back) {
      this.setState({ type: Camera.Constants.Type.front });
    } else {
      this.setState({ type: Camera.Constants.Type.back });
    }
  }

  handleFlashMode(): void {
    if (this.state.flashMode === "off") {
      this.setState({ flashMode: "on", flashActivated: true });
    } else {
      this.setState({ flashMode: "off", flashActivated: false });
    }
  }

  render() {
    if (!this.state.captured && this.state.uploaded) {
      return (
        <View style={{ flex: 1 }}>
          <Lottie
            loop={false}
            autoPlay={true}
            style={{
              flex: 1,
              backgroundColor: "#222"
            }}
            source={require("../assets/check-animation.json")}
            onAnimationFinish={() => this.setState({uploaded: false})}
          />
        </View>
      );
    } else if (this.state.captured) {
      return (
        <View style={{ flex: 1}}>
          <ImagePreview
            preview={(state) => this.handlePreview(state)}
            uri={this.state.photo.uri}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1}}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
            zoom={this.props.scale}
            ratio={"16:9"}
            flashMode={this.state.flashMode}
          >
            <BottomControl
              camera={() => this.handleCameraType()}
              takePicture={() => this.takePicture()}
              flashMode={() => this.handleFlashMode()}
              cameraType={this.state.type}
              flashActivated={this.state.flashActivated}
            />
          </Camera>
        </View>
      );
    }
  }
}
