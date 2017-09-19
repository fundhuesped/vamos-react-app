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

// import DeviceInfo from 'react-native-device-info';
/********************************************************/
/* localStorage : Persisting fetched data on local DB   */
/********************************************************/

let tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);

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
      console.log('creando store');
      _createStore('1')
      // alert('creando store');
      store.dispatch(setLang(I18n.currentLocale()))
      // alert(I18n.currentLocale())
    }
    else {
      // alert('cargando store '+storeRealm.places.length);
      console.log('cargando store '+storeRealm.places.length);
      // store.dispatch(updateStoreDB(Array.from(storeRealm.places)))
      console.log(Array.from(storeRealm.cities))
      store.dispatch(updateStoreDB({places:storeRealm.places, createdTimestamp:storeRealm.createdTimestamp, cities:storeRealm.cities}))
      store.dispatch(updateStoreUI(storeRealm.lang))
      // alert(I18n.currentLocale())

    }
  }

  componentDidMount = () => this.setState({rehydrated: true})

  componentWillUnmount = () =>{
    console.log('unmount');
  }

  render() {
    // return <ProgressCircle/>
    return (this.state.rehydrated) ? (
      <Provider store={store}>
          <Root>
            <AppNavigator
              onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = _getCurrentRouteName(currentState);
                const prevScreen = _getCurrentRouteName(prevState);
                if (prevScreen !== currentScreen) {
                  // console.log(tracker);
                  // tracker.trackScreenView(currentScreen);
                  // tracker.trackEvent('Customer', 'New');
                  //
                  // console.log(DeviceInfo.getUserAgent());
                }
              }}
            />
          </Root>
      </Provider>
    ): <ProgressCircle firstFetch={false} downloading={false}/>
  }
}

// export default() => (
//   <Provider store={store}>
//       <Root>
//         <AppNavigator
//           onNavigationStateChange={(prevState, currentState) => {
//             const currentScreen = _getCurrentRouteName(currentState);
//             const prevScreen = _getCurrentRouteName(prevState);
//             if (prevScreen !== currentScreen) {
//               // console.log(tracker);
//               tracker.trackScreenView(currentScreen);
//               // tracker.trackEvent('Customer', 'New');
//               //
//               // console.log(DeviceInfo.getUserAgent());
//             }
//           }}
//         />
//       </Root>
//   </Provider>
// )
