import React from 'react';

import {Text,Button,View} from 'react-native'

import {connect} from 'react-redux'
import {selectLookingFor} from '../../../constants/actions/index.js'

import DummyLanding from '../../../layouts/Landing/component.js'

import {HTTPService} from '../../../utils/HTTPServices/index.js';
import ProgressCircle from '../../Dummy/ProgressCircle/component.js'

import TeenIcon from '../../Dummy/SVG/TeenIcon/component.js'

mapStateToProps = (store) => {
    return {db: store.db, ui: store.ui}
}

class SmartLanding extends React.Component {


  componentDidMount = () =>{
    if(this.props.db.places.data.length === 0) HTTPService.fetchPlaces();
    else HTTPService.checkPlaces();

    // this._checkCities();

  }

  _checkCities = async () =>{
    let url = 'https://ippf-staging.com.ar/api/v1/places/all/autocomplete';

    try {
      console.log('fetcheando ciudades');
      let responseServices = await fetch(url)
      let responseServicesJson = await responseServices.json();
      console.log(responseServicesJson);
    } catch (e) {
      console.log(e.message);
    }
  }

  _handleService = (service) =>{
    if(service === "TEEN") this.props.dispatch(selectLookingFor(service))
    else {
      this.props.dispatch(selectLookingFor(service))
      this.props.navigation.navigate('Services',{service: service})
    }
  }

  render() {
    // console.log(this.props.db.);
    return ((this.props.db.isFetching) ? <ProgressCircle firstFetch={(this.props.db.places.meta.updatedAt === undefined) ? true : false} downloading={true}/> : <DummyLanding navigation={this.props.navigation} _handleService={this._handleService} lang={this.props.ui.lang}/>)
  }
}

export default connect(mapStateToProps)(SmartLanding)
