import React from "react"
import {Provider} from 'react-redux'
import {View,Text,Platform, Linking} from "react-native"
import {StackNavigator} from "react-navigation"
import { Root } from "native-base";
import Routes from '../config/routes/routes.js'
import store from '../store/index.js'
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import {GA_TRACKING_ID} from '../config/HTTP/index.js'

import ProgressCircle from '../components/Dummy/ProgressCircle/component.js'
import I18n from '../config/i18n';

import { _createStore, _getStore, } from '../storage';
import {updateStoreDB,updateStoreUI, startFetching, setLang} from '../constants/actions'
import SplashScreen from 'react-native-splash-screen'

import {tracker} from '../utils/analytics/index.js'

// import DeviceInfo from 'react-native-device-info';
/********************************************************/
/* localStorage : Persisting fetched data on local DB   */
/********************************************************/

// gets the current screen from navigation state
_getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return _getCurrentRouteName(route);
  }
  return route.routeName;
}

const AppNavigator = StackNavigator(
  Routes,
  {
    // initialRouteName: "InfoCountry",
    // initialRouteName: "Drawer",
    headerMode: 'none'
  }
);


export default class App extends React.Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount = () => {
    let storeRealm = _getStore("1");
    if(storeRealm === undefined) {
      _createStore('1')
      let langDefault = I18n.currentLocale(),
          lang;
      if(langDefault.includes('es')) lang = "es-ES"
      else lang = "en-US"
      store.dispatch(setLang(lang))
    }
    else {
      store.dispatch(updateStoreDB({places:storeRealm.places, createdTimestamp:storeRealm.createdTimestamp, cities:storeRealm.cities}))
      store.dispatch(updateStoreUI(storeRealm.lang))

    }
    setTimeout( () => {
    this.setState({rehydrated: true})
    SplashScreen.hide();
  }, 10);
}

  componentWillUnmount = () =>{
    console.log('unmount');
  }

  render() {
    return (true) ? (
      <Provider store={store}>
          <Root>
            <AppNavigator
              onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = _getCurrentRouteName(currentState);
                const prevScreen = _getCurrentRouteName(prevState);
                if (prevScreen !== currentScreen) {
                  tracker.trackScreenView(currentScreen);
                }
              }}
            />
          </Root>
      </Provider>
    ): <ProgressCircle firstFetch={false} downloading={false}/>
  }
}
