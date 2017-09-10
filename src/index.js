import Expo from "expo";
import React from "react";
import App from './root/App.js'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Expo.Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
}


export default class index extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
   this._loadAssetsAsync();
  }

 async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/vamos_logo.png')
    ]);

    const fontAssets = cacheFonts([
      {Roboto: require("native-base/Fonts/Roboto.ttf")},
      {OpenSans: require("./assets/fonts/OpenSans.ttf")},
      {Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")},
      {Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")}
    ]);

    await Promise.all([
      ...imageAssets,
      ...fontAssets,
    ]);

  this.setState({ isReady: true },()=>{console.log('cargado');});
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading/>;
    }
    return <App/>
  }
}
