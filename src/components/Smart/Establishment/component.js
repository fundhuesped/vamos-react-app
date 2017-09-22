import React from 'react';

import {Text,Button,View} from 'react-native'

import {connect} from 'react-redux'
import {selectLookingFor, setLang} from '../../../constants/actions/index.js'

import DummyEstablishment from '../../../layouts/Establishment/component.js'

import I18n from '../../../config/i18n/index.js';
import {_fetchPlaces, _checkPlaces} from '../../../utils/HTTPServices/index.js';
import ProgressCircle from '../../Dummy/ProgressCircle/component.js'

function mapStateToProps(store) {
    return {db: store.db, ui: store.ui}
}

class Establishment extends React.Component {

  constructor(){
    super();
    this.state = {
      comments: null,
      services: null
    }
  }

  componentDidMount = () =>{
    this._getEstablishment()
  }

  _getEstablishment = async () =>{
    let urlComments = `https://ippf-staging.com.ar/api/v2/evaluacion/comentarios/${this.props.navigation.state.params.establishmentData.placeData.placeId}`
    // let urlComments = `https://ippf-staging.com.ar/api/v2/evaluacion/comentarios/106122`
    try {
      let responseComments = await fetch(urlComments)
      let responseCommentsJson = await responseComments.json();
      // alert('comments'+" "+responseCommentsJson.length);
      // this.setState({comments:responseCommentsJson})
      let urlServices = `https://ippf-staging.com.ar/api/v2/service/getPlaceServices/${this.props.navigation.state.params.establishmentData.placeData.placeId}`
      // let urlServices = `https://ippf-staging.com.ar/api/v2/service/getPlaceServices/106122`
      try {
        let responseServices = await fetch(urlServices)
        let responseServicesJson = await responseServices.json();
        let services = [];
        responseServicesJson.map( (service,index) =>{
          services.push({
            title: service.shortname,
            content:{
              id: service.id,
              name: service.name,
              shortname: service.shortname
            }
          })
        })
        // alert('services'+" "+services.length);
        this.setState({services:services, comments:responseCommentsJson})

      } catch(error) {
          // alert('services error'+" "+error+" "+error.message);
        this.setState({services:[], comments:[]})
      }
    } catch(error) {
      // alert('comments error'+" "+error+" "+error.message);
      this.setState({services:[], comments:[]})
    }




  }

  render() {
    return ((this.state.comments !== null && this.state.services !== null) ?
    <DummyEstablishment
      servicesAvailable={this.state.services}
      commentsAvailable={this.state.comments}
      navigation={this.props.navigation}
      establishmentData={this.props.navigation.state.params.establishmentData}
      lang={this.props.ui.lang}/>
    : <ProgressCircle downloading={false}/>)
  }
}

export default connect(mapStateToProps)(Establishment)
