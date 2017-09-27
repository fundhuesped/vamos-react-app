import React from 'react';


import {connect} from 'react-redux'
import {updatePlaces} from '../../../constants/actions/index.js'

import DummyServices from '../../../layouts/Services/component.js'

import {getServiceData} from '../../../utils/engines/index.js'

import {tracker} from '../../../utils/analytics/index.js'

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
    return {db: store.db, ui: store.ui}
}

class SmartServices extends React.Component {

  componentDidMount = () =>{
    console.log(this.props);
  }

  render() {
    tracker.trackEvent('servicio', this.props.ui.lookingFor);
    return (<DummyServices
      navigation={this.props.navigation} serviceTypeData={(this.props.ui.lookingFor === this.props.navigation.state.params.service) ? this.props.ui.lookingFor : CON }
      db={this.props.db}
      ui={this.props.ui}
      dispatch={this.props.dispatch}
    />)
  }
}

export default connect(mapStateToProps)(SmartServices)
