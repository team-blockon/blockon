import React, { Component } from "react";
import { WebView, StyleSheet, Platform, StatusBar } from "react-native";

export default class App extends Component {
  render() {
    return (
      <WebView
        source={{ uri: "http://52.79.254.194" }}
        style={styles.app}
        useWebKit={Platform.OS === "ios" ? true : false}
      />
    );
  }
}

const styles = StyleSheet.create({
  app: {
    marginTop: Platform.OS === "ios" ? 18 : StatusBar.currentHeight
  }
});
