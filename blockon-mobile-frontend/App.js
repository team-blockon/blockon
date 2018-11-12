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

  render() {
    return (
      <View style={styles.appContainer}>
        <WebView
          ref="WEBVIEW_REF"
          startInLoadingState={true}
          source={{ uri: "http://52.79.41.43" }}
          useWebKit={Platform.OS === "ios" ? true : false}
        />
        <Button title="Refresh!!" onPress={this._refreshWebView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 18 : StatusBar.currentHeight
  }
});
