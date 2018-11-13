import React, { Component } from "react";
import {
  WebView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class App extends Component {
  _refreshWebView = async () => {
    this.refs.WEBVIEW_REF.reload();
  };

  _goPreviousPage = () => {
    this.refs.WEBVIEW_REF.goBack();
  };

  _goNextPage = () => {
    this.refs.WEBVIEW_REF.goForward();
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <WebView
          ref="WEBVIEW_REF"
          startInLoadingState={true}
          source={{ uri: "http://52.79.41.43" }}
          useWebKit={Platform.OS === "ios" ? true : false}
        />
        <View style={styles.buttonContainerSizer}>
          <View style={styles.buttonContainer}>
            <CustomButton iconName="navigate-before" title="이전" />
            <CustomButton iconName="refresh" title="새로고침" />
            <CustomButton iconName="navigate-next" title="다음" />
          </View>
        </View>
      </View>
    );
  }
}

const CustomButton = ({ iconName, title }) => (
  <TouchableOpacity style={styles.button} onPress={this._goNextPage}>
    <MaterialIcons name={iconName} size={32} color="#444444" />
    <Text style={{ color: "#444444" }}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 18 : StatusBar.currentHeight
  },
  buttonContainerSizer: {
    height: 60
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
