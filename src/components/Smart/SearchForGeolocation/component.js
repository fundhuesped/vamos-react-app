import React from 'react';

import {Text,Button,View} from 'react-native'

import {connect} from 'react-redux'

import DummySearchForGeolocation from '../../../layouts/SearchForGeolocation/component.js'

import {selectSearchEngine, setCurrentLocation} from '../../../constants/actions/index.js'
import {GEOLOCATE, DISTANCE, RATE, TEEN, AUTOCOMPLETE} from '../../../constants/action-types/index.js'

import ProgressCircle from '../../Dummy/ProgressCircle/component.js'

import {Engine} from '../../../utils/engines'


function mapStateToProps(store) {
    return {db: store.db, ui: store.ui}
}

class SmartSearchForGeolocation extends React.Component {

  componentDidMount = () =>{
    this._filterData();
  }

  _filterData = () =>{
    console.log(this.props.navigation.state.params);
    console.log(this.props.navigation.state.params.isTeen);
    this.Engine = new Engine(this.props.db.places.data, this.props.ui.lookingFor);
    if(this.props.navigation.state.params.cityDepartment !== undefined){
      this.props.dispatch(selectSearchEngine(AUTOCOMPLETE))
      this.Engine.searchForAutocomplete(this.props.navigation.state.params.cityDepartment);
    }
    else {
      if(this.props.navigation.state.params.isTeen) {
        this.props.dispatch(selectSearchEngine(TEEN))
        this.Engine.searchForTeen({latitude:this.props.navigation.state.params.coords.latitude, longitude:this.props.navigation.state.params.coords.longitude});
      }
      else {
        this.props.dispatch(selectSearchEngine(GEOLOCATE))
        this.Engine.searchForGeolocation({latitude:this.props.navigation.state.params.coords.latitude, longitude:this.props.navigation.state.params.coords.longitude});
      }
    }
  }



  _changeSortValue = (sortEngine, value) => {
    console.log(sortEngine);
    if(sortEngine === TEEN) this.Engine.sortEngine(sortEngine, value)
    else this.Engine.sortEngine(sortEngine)
  }

  componentWillUnmount = () => this.Engine.cleanResultList()

  render() {
    let data = this.props.ui.resultList;
    let coords = this.props.navigation.state.params.coords
    return ((true) ?
    <DummySearchForGeolocation
      navigation={this.props.navigation}
      store={data}
      _changeSortValue={this._changeSortValue}
      coords={coords}
      address={this.props.navigation.state.params.address}
      serviceTypeData={this.props.ui.lookingFor}
      lang={this.props.ui.lang}/>
    : <ProgressCircle/>)
  }
}

export default connect(mapStateToProps)(SmartSearchForGeolocation)
