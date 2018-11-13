import React, { Component } from "react";
import {
  WebView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Button
} from "react-native";

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
            <Button title="이전" onPress={this._goPreviousPage} />
            <Button title="새로고침" onPress={this._refreshWebView} />
            <Button title="다음" onPress={this._goNextPage} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 18 : StatusBar.currentHeight
  },
  buttonContainerSizer: {
    height: 40
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#444444"
  }
});
