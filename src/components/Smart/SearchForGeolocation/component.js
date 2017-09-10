import React from 'react';

import {Text,Button,View} from 'react-native'

import {connect} from 'react-redux'

import DummySearchForGeolocation from '../../../layouts/SearchForGeolocation/component.js'

import {selectSearchEngine, setCurrentLocation} from '../../../constants/actions/index.js'
import {GEOLOCATE, DISTANCE, RATE, TEEN} from '../../../constants/action-types/index.js'

import ProgressCircle from '../../Dummy/ProgressCircle/component.js'

import {Engine} from '../../../utils/engines'


function mapStateToProps(store) {
    return {db: store.db, ui: store.ui}
}

class SmartSearchForGeolocation extends React.Component {

  componentDidMount = () =>{
    console.log(this.props.navigation.state.params);
    console.log(this.props.navigation.state.params.isTeen);
    this.Engine = new Engine(this.props.db.places.data, this.props.ui.lookingFor);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude+" "+position.coords.longitude);
        this.props.dispatch(setCurrentLocation(position.coords.latitude,position.coords.longitude))
        // alert(position.coords.latitude+" "+position.coords.longitude);

        if(this.props.navigation.state.params.isTeen) {
          this.props.dispatch(selectSearchEngine(TEEN))
          this.Engine.searchForTeen({latitude:position.coords.latitude, longitude:position.coords.longitude});
        }
        else {
          this.props.dispatch(selectSearchEngine(GEOLOCATE))
          this.Engine.searchForGeolocation({latitude:position.coords.latitude, longitude:position.coords.longitude});
        }


      },
      (error) => this.setState({ errorMessage: error.message }, ()=> {
        // alert('error geolocalizando '+error.message);
      }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }

  _changeSortValue = (sortEngine, value) => {
    console.log(sortEngine);
    if(sortEngine === TEEN) this.Engine.sortEngine(sortEngine, value)
    else this.Engine.sortEngine(sortEngine)
  }

  componentWillUnmount = () => this.Engine.cleanResultList()

  render() {
    let data = this.props.ui.resultList;
    let coords = this.props.ui.searchEngine.userInput.GEOLOCATE.currentLocation
    return ((coords.latitude !== null && coords.longitude !== null) ? <DummySearchForGeolocation navigation={this.props.navigation} store={data} _changeSortValue={this._changeSortValue} coords={coords} serviceTypeData={this.props.ui.lookingFor} lang={this.props.ui.lang}/> : <ProgressCircle/>)
  }
}

export default connect(mapStateToProps)(SmartSearchForGeolocation)
