import React from 'react';

import {Text,Button,View} from 'react-native'

import {connect} from 'react-redux'

import DummySearchForGeolocation from '../../../layouts/SearchForGeolocation/component.js'

import {selectSearchEngine} from '../../../constants/actions/index.js'
import {DISTANCE, RATE, TEEN, AUTOCOMPLETE} from '../../../constants/action-types/index.js'

import ProgressCircle from '../../Dummy/ProgressCircle/component.js'

import {Engine} from '../../../utils/engines'

import {tracker} from '../../../utils/analytics/index.js'

function mapStateToProps(store) {
    return {db: store.db, ui: store.ui}
}

class SmartSearchForGeolocation extends React.Component {

  componentDidMount = () =>{
    this.Engine = new Engine(this.props.db.places.data, this.props.ui.lookingFor);
  }

  _changeSortValue = (sortEngine, value) => {
    if(sortEngine === TEEN) this.Engine.sortEngine(sortEngine, value)
    else this.Engine.sortEngine(sortEngine)
  }

  // componentWillUnmount = () => this.Engine.cleanResultList()

  render() {
    let data = this.props.ui.resultList;
    let event = 'listado_'+this.props.ui.lookingFor;
    tracker.trackEvent(event, this.props.navigation.state.params.country);
    return ((true) ?
    <DummySearchForGeolocation
      navigation={this.props.navigation}
      store={data}
      _changeSortValue={this._changeSortValue}
      address={this.props.navigation.state.params.address}
      serviceTypeData={this.props.ui.lookingFor}
      lang={this.props.ui.lang}
      searchEngine={(this.props.ui.searchEngine.selected.name !== AUTOCOMPLETE) ? true : false}
    />
    : <ProgressCircle/>)
  }
}

export default connect(mapStateToProps)(SmartSearchForGeolocation)
