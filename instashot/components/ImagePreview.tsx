import React, { Component, Fragment } from "react";
import { View, Image } from "react-native";
import Lottie from "lottie-react-native";
import Header from "./Header";
import axios from "axios";

interface Props {
  uri: string;
  preview(state: boolean): void;
}

interface State {
  loading: boolean;
}
export default class ImagePreview extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  handleClose() {
    this.props.preview(false);
  }

  handleSend() {
    console.log("sending");
    const { uri } = this.props;
    const formData = new FormData();
    formData.append("image", {
      name: "name",
      type: "image/jpg",
      uri: uri
    });
    this.setState({ loading: true });
    axios
      .post("API", formData)
      .then(res => {
        this.setState({ loading: false });
        this.props.preview(true);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  render() {
    const { uri } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {!this.state.loading ? (
          <Fragment>
            <Header
              close={() => this.handleClose()}
              send={() => this.handleSend()}
            />
            <Image
              style={{ flex: 1, backgroundColor: "rgba(34, 34, 34, 1)" }}
              source={{ uri }}
            />
          </Fragment>
        ) : (
          <Lottie
            loop={true}
            autoPlay={true}
            style={{
              flex: 1,
              backgroundColor: "#222"
            }}
            source={require("../assets/loading.json")}
          />
        )}
      </View>
    );
  }
}
