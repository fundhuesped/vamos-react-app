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

let commentsAvailable = [
  {
    comentario: "",
    establecimiento: "Centro Regional De Referencia Dr Ramon Carrillo",
    que_busca: "Condones (preservativos)",
    voto: 4
  },
  {
    comentario: "",
    establecimiento: "Centro Regional De Referencia Dr Ramon Carrillo",
    que_busca: "Condones (preservativos)",
    voto: 10
  },
  {
    comentario: "Comentario super largo bien largo, largazooooooooooooooooooooooooooo viste",
    establecimiento: "Centro Regional De Referencia Dr Ramon Carrillo",
    que_busca: "Condones (preservativos)",
    voto: 6
  },
]

let establishmentData = {
  distance: 1.3,
  placeData:{
    establecimiento: "establecimiento super largo de nombre super mas largo que estan largo ",
    calle: 'calle bastante larga como para ser recontra larga',
    altura: 2000,
    rateReal: 7.5,
    // rateReal: 0
    responsable_distrib: 'Algun nombre fancy super largoo capaaz',
    horario_distrib: "Lun a Vie de 7 a 13 hs.",
    tel_distrib: "(0343) 4208825",
    // mail_distrib: 'algo@otra.cosa',
    mail_distrib: "",
    web_distrib: 'establecimiento.com.ar',
    cantidad_votos: 100

  }
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
    console.log(this.props.navigation.state.params);
  }

  _getEstablishment = async () =>{
    let urlComments = `https://ippf-staging.com.ar/api/v2/evaluacion/comentarios/${this.props.navigation.state.params.establishmentData.placeData.placeId}`
    // let urlComments = `https://ippf-staging.com.ar/api/v2/evaluacion/comentarios/106122`
    try {
      let responseComments = await fetch(urlComments)
      let responseCommentsJson = await responseComments.json();
      console.log(responseCommentsJson);
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
        console.log(services);
        this.setState({services:services, comments:responseCommentsJson})

      } catch(error) {
        console.log(error.message);
        this.setState({services:[], comments:[]})
      }
    } catch(error) {
      console.log(error);
      this.setState({services:[], comments:[]})
    }




  }

  render() {
    console.log(this.state.services);
    console.log(this.state.comments);
    return ((this.state.comments !== null && this.state.services !== null) ? <DummyEstablishment servicesAvailable={this.state.services} commentsAvailable={this.state.comments} navigation={this.props.navigation} establishmentData={this.props.navigation.state.params.establishmentData} lang={this.props.ui.lang}/> : <ProgressCircle downloading={false}/>)
  }
}

export default connect(mapStateToProps)(Establishment)
