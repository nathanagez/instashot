import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(34, 34, 34, 1)"
  }
});

interface Props {
  close(): void;
  send(): void;
}

export default class Header extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: "rgba(34, 34, 34, 1)"
    }
  }
  handleClose = () => {
    this.props.close();
  };

  handleSend = () => {
    this.props.send();
  };
  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="x"
          color="white"
          size={24}
          onPress={() => this.handleClose()}
        />
        <Icon
          name="check"
          color="white"
          size={24}
          onPress={() => this.handleSend()}
        />
      </View>
    );
  }
}
