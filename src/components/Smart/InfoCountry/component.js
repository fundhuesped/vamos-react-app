import React from 'react';
import DummyInfoCountry from '../../../layouts/InfoCountry/component.js'
import ProgressCircle from '../../Dummy/ProgressCircle/component.js'
import {connect} from 'react-redux'







function mapStateToProps(store) {
    return {ui: store.ui}
}

class SmartInfoCountry extends React.Component {

  constructor(){
    super();
    this.state = {loaded: false, country: '', address: ''}
  }

  componentDidMount = () => this._getCountry();

  _getCountry = () =>{
    let country,
        cityDepartment = this.props.navigation.state.params.cityDepartment

    if(cityDepartment !== undefined){
      if(cityDepartment.nombre_pais === "Antigua and Barbuda" || cityDepartment.idPais === 5) country = "AG"
      if(cityDepartment.nombre_pais === "Argentina" || cityDepartment.idPais === 6) country = "AR"
      if(cityDepartment.nombre_pais === "Aruba" || cityDepartment.idPais === 7) country = "AW"
      if(cityDepartment.nombre_pais === "Barbados" || cityDepartment.idPais === 8) country = "BB"
      if(cityDepartment.nombre_pais === "Belize" || cityDepartment.idPais === 9) country = "BZ"
      if(cityDepartment.nombre_pais === "Bolivia" || cityDepartment.idPais === 10) country = "BO"
      if(cityDepartment.nombre_pais === "Chile" || cityDepartment.idPais === 11) country = "CL"
      if(cityDepartment.nombre_pais === "Colombia" || cityDepartment.idPais === 12) country = "CO"
      if(cityDepartment.nombre_pais === "Curacao" || cityDepartment.idPais === 13) country = "CW"
      if(cityDepartment.nombre_pais === "Dominica" || cityDepartment.idPais === 14) country = "DM"
      if(cityDepartment.nombre_pais === "Ecuador" || cityDepartment.idPais === 16) country = "EC"
      if(cityDepartment.nombre_pais === "El Salvador" || cityDepartment.idPais === 17) country = "SV"
      if(cityDepartment.nombre_pais === "Grenada" || cityDepartment.idPais === 18) country = "GD"
      if(cityDepartment.nombre_pais === "Guatemala" || cityDepartment.idPais === 19) country = "GT"
      if(cityDepartment.nombre_pais === "Guyana" || cityDepartment.idPais === 20) country = "GY"
      if(cityDepartment.nombre_pais === "Haiti" || cityDepartment.idPais === 21 || cityDepartment.nombre_pais === "Haití") country = "HT"
      if(cityDepartment.nombre_pais === "Honduras" || cityDepartment.idPais === 22) country = "HN"
      if(cityDepartment.nombre_pais === "Jamaica" || cityDepartment.idPais === 23) country = "JM"
      if(cityDepartment.nombre_pais === "México" || cityDepartment.idPais === 24) country = "MX"
      if(cityDepartment.nombre_pais === "Panamá" || cityDepartment.idPais === 25) country = "PA"
      if(cityDepartment.nombre_pais === "Paraguay" || cityDepartment.idPais === 26) country = "PY"
      if(cityDepartment.nombre_pais === "Perú" || cityDepartment.idPais === 27) country = "PE"
      if(cityDepartment.nombre_pais === "Puerto Rico" || cityDepartment.idPais === 28) country = "PR"
      if(cityDepartment.nombre_pais === "República Dominicana" || cityDepartment.idPais === 15) country = "DO"
      if(cityDepartment.nombre_pais === "Saint Vincent" || cityDepartment.idPais === 30) country = "VC"
      if(cityDepartment.nombre_pais === "Saint Lucia" || cityDepartment.idPais === 29) country = "LC"
      if(cityDepartment.nombre_pais === "Suriname" || cityDepartment.idPais === 31) country = "SR"
      if(cityDepartment.nombre_pais === "Trinidad and Tobago" || cityDepartment.idPais === 32) country = "TT"
      if(cityDepartment.nombre_pais === "Uruguay" || cityDepartment.idPais === 34) country = "UY"
      if(cityDepartment.nombre_pais === "Venezuela" || cityDepartment.idPais === 35) country = "VE"

      this.setState({country: country, loaded:true})
    }else {
      this.setState({country: (this.props.navigation.state.params.country)  ? this.props.navigation.state.params.country : '' , loaded:true, address: this.props.navigation.state.params.address})
    }
  }

  render() {
    return ((this.state.loaded) ?
    <DummyInfoCountry
      country={this.state.country}
      service={this.props.ui.lookingFor}
      navigation={this.props.navigation}
      address={this.state.address}
      coords={this.props.navigation.state.params.coords}
      cityDepartment={this.props.navigation.state.params.cityDepartment}
      lang={this.props.ui.lang}
    />
    : <ProgressCircle downloading={false}/>)
  }
}

export default connect(mapStateToProps)(SmartInfoCountry)
