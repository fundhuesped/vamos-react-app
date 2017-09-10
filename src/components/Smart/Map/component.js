import React from 'react';

import {Text,Button,View} from 'react-native'

import {connect} from 'react-redux'

import DummyMap from '../../../layouts/Map/component.js'

import {setCurrentLocation} from '../../../constants/actions/index.js'

import ProgressCircle from '../../Dummy/ProgressCircle/component.js'


function mapStateToProps(store) {
    return {db: store.db, ui: store.ui}
}

class SmartMap extends React.Component {


  render() {
    let coords = this.props.ui.searchEngine.userInput.GEOLOCATE.currentLocation;
    return ((coords.latitude !== null && coords.longitude !== null) ?
    <DummyMap
      // coords={(this.props.navigation.state.params === undefined) ? coords : {latitude: this.props.navigation.state.params.establishmentData.placeData.latitude, longitude: this.props.navigation.state.params.establishmentData.placeData.longitude }}
      coords={coords}
      navigation={this.props.navigation}
      store={(this.props.navigation.state.params === undefined) ? this.props.ui.resultList : [this.props.navigation.state.params.establishmentData]}/>
      : <ProgressCircle downloading={false}/>
    )
  }
}

export default connect(mapStateToProps)(SmartMap)
