import React from 'react';


import {connect} from 'react-redux'
import {updatePlaces} from '../../../constants/actions/index.js'

import DummyServices from '../../../layouts/Services/component.js'

import {getServiceData} from '../../../utils/engines/index.js'

import {citiesArray} from '../../../utils/validators/index.js'

import {
  CON,
  VIH,
  SSR,
  MAC,
  LPI,
  DC,
  TEEN
} from '../../../constants/action-types'



function mapStateToProps(store) {
    return {ui: store.ui}
}

class SmartServices extends React.Component {

  componentDidMount = () =>{

  }

  render() {
    return (<DummyServices navigation={this.props.navigation} serviceTypeData={(this.props.ui.lookingFor === this.props.navigation.state.params.service) ? this.props.ui.lookingFor : CON } lang={this.props.ui.lang} cities={citiesArray}/>)
  }
}

export default connect(mapStateToProps)(SmartServices)
