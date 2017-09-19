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

  _getCountry = async () =>{
    let country,
        cityDepartment = this.props.navigation.state.params.cityDepartment

    if(cityDepartment !== undefined){
      if(cityDepartment.nombre_pais === "Antigua y Barbuda" || cityDepartment.idPais === 5) country = "AG"
      if(cityDepartment.nombre_pais === "Argentina" || cityDepartment.idPais === 6) country = "AR"
      if(cityDepartment.nombre_pais === "Aruba" || cityDepartment.idPais === 7) country = "AW"
      if(cityDepartment.nombre_pais === "Barbados" || cityDepartment.idPais === 8) country = "BB"
      if(cityDepartment.nombre_pais === "Belice" || cityDepartment.idPais === 9) country = "BZ"
      if(cityDepartment.nombre_pais === "Bolivia" || cityDepartment.idPais === 10) country = "BO"
      if(cityDepartment.nombre_pais === "Chile" || cityDepartment.idPais === 11) country = "CL"
      if(cityDepartment.nombre_pais === "Colombia" || cityDepartment.idPais === 12) country = "CO"
      if(cityDepartment.nombre_pais === "Curazao" || cityDepartment.idPais === 13) country = "CW"
      if(cityDepartment.nombre_pais === "Dominica" || cityDepartment.idPais === 14) country = "DM"
      if(cityDepartment.nombre_pais === "Ecuador" || cityDepartment.idPais === 16) country = "EC"
      if(cityDepartment.nombre_pais === "El Salvador" || cityDepartment.idPais === 17) country = "SV"
      if(cityDepartment.nombre_pais === "Granada" || cityDepartment.idPais === 18) country = "GD"
      if(cityDepartment.nombre_pais === "Guatemala" || cityDepartment.idPais === 19) country = "GT"
      if(cityDepartment.nombre_pais === "Guyana" || cityDepartment.idPais === 20) country = "GY"
      if(cityDepartment.nombre_pais === "Haití" || cityDepartment.idPais === 21) country = "HT"
      if(cityDepartment.nombre_pais === "Honduras" || cityDepartment.idPais === 22) country = "HN"
      if(cityDepartment.nombre_pais === "Jamaica" || cityDepartment.idPais === 23) country = "JM"
      if(cityDepartment.nombre_pais === "México" || cityDepartment.idPais === 24) country = "MX"
      if(cityDepartment.nombre_pais === "Panamá" || cityDepartment.idPais === 25) country = "PA"
      if(cityDepartment.nombre_pais === "Paraguay" || cityDepartment.idPais === 26) country = "PY"
      if(cityDepartment.nombre_pais === "Perú" || cityDepartment.idPais === 27) country = "PE"
      if(cityDepartment.nombre_pais === "Puerto Rico" || cityDepartment.idPais === 28) country = "PR"
      if(cityDepartment.nombre_pais === "República Dominicana" || cityDepartment.idPais === 15) country = "DO"
      if(cityDepartment.nombre_pais === "San Vicente y las Granadinas" || cityDepartment.idPais === 30) country = "VC"
      if(cityDepartment.nombre_pais === "Santa Lucía" || cityDepartment.idPais === 29) country = "LC"
      if(cityDepartment.nombre_pais === "Surinam" || cityDepartment.idPais === 31) country = "SR"
      if(cityDepartment.nombre_pais === "Trinidad y Tobago" || cityDepartment.idPais === 32) country = "TT"
      if(cityDepartment.nombre_pais === "Uruguay" || cityDepartment.idPais === 34) country = "UY"
      if(cityDepartment.nombre_pais === "Venezuela" || cityDepartment.idPais === 35) country = "VE"

      this.setState({country: country, loaded:true})
    }else {

          let url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.navigation.state.params.coords.latitude},${this.props.navigation.state.params.coords.longitude}&sensor=false`;
        try {
          let response = await fetch(url, {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                }})
          let responseJson = await response.json();

          if(responseJson.status !== "OK"){
              // alert('FAIL GEOCODIGN');
          }
          else{
            console.log(responseJson);
            let address = {};
            const address_components = responseJson.results[0].address_components;
            let country;
            address_components.forEach(element => {
                address[element.types[0]] = element.long_name;
                if(element.types[0] === "country") country = element.short_name
            });


            let addressFormated = {
                  formatted_address: responseJson.results[0].formatted_address,
                  address_parts: address
              };

            this.setState({address:addressFormated, country: country, loaded: true})
          }
        } catch (e) {
          console.log(e);
        }


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
    />
    : <ProgressCircle downloading={false}/>)
  }
}

export default connect(mapStateToProps)(SmartInfoCountry)
