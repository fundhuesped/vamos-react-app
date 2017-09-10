import React from 'react';

import {Text,Button,View} from 'react-native'

import {connect} from 'react-redux'
import {selectLookingFor, setLang} from '../../../constants/actions/index.js'

import DummyEvaluations from '../../../layouts/Evaluations/component.js'

import I18n from '../../../config/i18n/index.js';
import {_fetchPlaces, _checkPlaces} from '../../../utils/HTTPServices/index.js';
import ProgressCircle from '../../Dummy/ProgressCircle/component.js'

function mapStateToProps(store) {
    return {db: store.db, ui: store.ui}
}

const servicesAvailable = [
  {
    title: 'condones',
    content: {
      "id": 6,
      "name": "Condones",
      "shortname": "condones"
    },
  },
  {
    title: 'prueba',
    content: {
      "id": 5,
      "name": "Prueba VIH",
      "shortname": "prueba"
    },
  },
  {
    title: 'ILE',
    content: {
      "id": 2,
      "name": "Interrupción Legal de Embarazo",
      "shortname": "ILE"
    },
  },
  {
    title: 'DC',
    content: {
      "id": 2,
      "name": "Interrupción Legal de Embarazo",
      "shortname": "DC"
    },
  },
  {
    title: 'MAC',
    content: {
      "id": 2,
      "name": "Interrupción Legal de Embarazo",
      "shortname": "MAC"
    },
  },
]

class Evaluations extends React.Component {

  constructor(){
    super();
    this.state = {
      loaded: false
    }
  }

  componentDidMount = () => {
    console.log(this.props.navigation.state.params);
  }

  render() {
    // return ((this.state.loaded) ? <DummyEvaluations navigation={this.props.navigation}/> : <ProgressCircle/>)
    return (<DummyEvaluations navigation={this.props.navigation} servicesAvailable={this.props.navigation.state.params.servicesAvailable} establishmentId={this.props.navigation.state.params.establishmentId} lang={this.props.ui.lang}/> )
    // return (<DummyEvaluations navigation={this.props.navigation} servicesAvailable={servicesAvailable} currentService={this.props.ui.lookingFor} establishmentId={"147272"}/> )
  }
}

export default connect(mapStateToProps)(Evaluations)
