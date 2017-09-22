import {
  CON,
  VIH,
  SSR,
  MAC,
  LPI,
  DC,
  TEEN,
  RATE,
  DISTANCE,
  NEARBY
} from '../../constants/action-types';
import React from "react"
import store from '../../store';
import I18n from '../../config/i18n/index.js';
import {Toast, Icon} from 'native-base';
import {DISTANCE_KM} from '../../config/HTTP/index.js'

import SVGCondomIcon from '../../components/Dummy/SVG/CondomIcon/component.js'
import SVGDetectionIcon from '../../components/Dummy/SVG/DetectionIcon/component.js'
import SVGHealthIcon from '../../components/Dummy/SVG/HealthIcon/component.js'
import SVGILEIcon from '../../components/Dummy/SVG/ILEIcon/component.js'
import SVGMACIcon from '../../components/Dummy/SVG/MACIcon/component.js'
import SVGTeenIcon from '../../components/Dummy/SVG/TeenIcon/component.js'
import SVGVIHIcon from '../../components/Dummy/SVG/VIHIcon/component.js'

import {
  setResultList
} from '../../constants/actions';

export const HaversineFormula = (place, coordsOrigin) => {
  let latOrigin = coordsOrigin.latitude,
    lonOrigin = coordsOrigin.longitude;

  //START ‘Haversine’ formula
  let R = 6371, // Radius of the earth in km
    distance, //Distance between points
    dLat = (Math.PI / 180) * (place.latitude - latOrigin),
    dLon = (Math.PI / 180) * (place.longitude - lonOrigin),
    a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((Math.PI / 180) * (latOrigin)) * Math.cos((Math.PI / 180) * (place.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  distance = R * c;
  //END ‘Haversine’ formula

  return distance; // Distance in km
}

const isTeen = (place) => (place.friendly_condones || place.friendly_dc || place.friendly_ile || place.friendly_mac || place.friendly_prueba || place.friendly_ssr)

export const getGralTextandILEForCountry = (country) =>{
  let ILEService,
      asocciationImageUrl;
  switch (country) {
    case "AG":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/AG.jpg')
      }
      break;
    case "AR":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/AR.jpg')
      }
      break;
    case "AW":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/AW.jpg')
      }
      break;
    case "BB":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/BB.jpg')
      }
      break;
    case "BZ":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/BZ.jpg')
      }
      break;
    case "BO":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/BO.jpg')
      }
      break;
    case "CL":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/CL.jpg')
      }
      break;
    case "CO":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/CO.jpg')
      }
      break;
    case "CW":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/CW.jpg')
      }
      break;
    case "DM":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/DM.jpg')
      }
      break;
    case "DO":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/DO.jpg')
      }
      break;
    case "EC":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/EC.jpg')
      }
      break;
    case "SV":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/SV.jpg')
      }
      break;
    case "GD":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/GD.jpg')
      }
      break;
    case "GT":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/GT.jpg')
      }
      break;
    case "GY":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/GY.jpg')
      }
      break;
    case "HT":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/HT.jpg')
      }
      break;
    case "HN":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/HN.jpg')
      }
      break;
    case "JM":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/JM.jpg')
      }
      break;
    case "MX":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/MX.jpg')
      }
      break;
    case "PA":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/PA.jpg')
      }
      break;
    case "PY":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/PY.jpg')
      }
      break;
    case "PE":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/PE.jpg')
      }
      break;
    case "PR":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/PR.jpg')
      }
      break;
    case "LC":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/LC.jpg')
      }
      break;
    case "VC":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/VC.jpg')
      }
      break;
    case "SR":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/SR.jpg')
      }
      break;
    case "TT":
      {
        ILEService = false;
        asocciationImageUrl =  require('../../assets/images/countryLogos/TT.jpg')
      }
      break;
    case "UY":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/UY.jpg')
      }
      break;
    case "VE":
      {
        ILEService = true;
        asocciationImageUrl =  require('../../assets/images/countryLogos/VE.jpg')
      }
      break;

    default:
  }

  return {
    generalText: I18n.t(`General_Service_${country}`, {locale: store.getState().ui.lang}),
    asocciationImageUrl: asocciationImageUrl,
    ILEText: I18n.t(`General_ILE_${country}`, {locale: store.getState().ui.lang}),
    ILEService: ILEService
  };
}

export const getServiceData = (service, size) => {
  let serviceData;
  switch (service) {
    case CON:
      serviceData = {
        svg: <SVGCondomIcon height={size}
        width={size}/>,
        title: I18n.t("condones_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("condones_desc", {locale: store.getState().ui.lang})
      }
      break;
    case VIH:
      serviceData = {
        svg: <SVGVIHIcon height={size}
        width={size}/>,
        title: I18n.t("prueba_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("prueba_desc", {locale: store.getState().ui.lang})
      }
      break;
    case SSR:
      serviceData = {
        svg:<SVGHealthIcon height={size}
        width={size}/>,
        title: I18n.t("ssr_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("ssr_desc", {locale: store.getState().ui.lang})
      }
      break;
    case MAC:
      serviceData = {
        svg:<SVGMACIcon height={size}
        width={size}/>,
        title: I18n.t("mac_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("mac_desc", {locale: store.getState().ui.lang})
      }
      break;
    case LPI:
      serviceData = {
        svg:<SVGILEIcon height={size}
        width={size}/>,
        title: I18n.t("ile_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("ile_desc", {locale: store.getState().ui.lang})
      }
      break;
    case DC:
      serviceData = {
        svg:<SVGDetectionIcon height={size}
        width={size}/>,
        title: I18n.t("dc_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("dc_desc", {locale: store.getState().ui.lang})
      }
      break;
    case TEEN:
      serviceData = {
        svg:<SVGTeenIcon height={size}
        width={size}/>,
        title: I18n.t("friendly_service_label", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("adol_desc_short", {locale: store.getState().ui.lang})
      }
      break;
    case NEARBY:
      serviceData = {
        svg:<Icon name='ios-pin' style={{fontSize: size, color:'#e6334c'}}/>,
        title: I18n.t("nearby", {locale: store.getState().ui.lang}).toUpperCase(),
        subtitle: ""
      }
      break;
    default:

  }

  return serviceData
}



export class Engine {

  constructor(store, lookingFor) {
    this.Store = store ;
    this.Data = [];
    // this.coordsOrigin = coords;
    this.Service = lookingFor;

    // this.sortEngine = this.sortEngine.bind(this);
  }

  searchForGeolocation = (coordsOrigin) => {
    console.log('SEARCHENGINE GEOLOCATE');
    // alert(this.Store.length)
    // let coordsOriginMock = {
    //   latitude: -34.4860687255859,
    //   longitude: -58.7250442504883
    // };
    let filterData = Object.values(this.Store).filter((place) => {
      // let distance = HaversineFormula(place, coordsOriginMock);
      let distance = HaversineFormula(place, coordsOrigin);
      switch (this.Service) {
        case CON:
          {
            if (distance <= DISTANCE_KM && distance !== 0 && place.condones) return place;
            break;
          }
        case VIH:
          {
            if (distance <= DISTANCE_KM && distance !== 0 && place.prueba) return place;
            break;
          }
        case SSR:
          {
            if (distance <= DISTANCE_KM && distance !== 0 && place.ssr) return place;
            break;
          }
        case MAC:
          {
            if (distance <= DISTANCE_KM && distance !== 0 && place.mac) return place;
            break;
          }
        case LPI:
          {
            if (distance <= DISTANCE_KM && distance !== 0 && place.ile) return place;
            break;
          }
        case DC:
          {
            if (distance <= DISTANCE_KM && distance !== 0 && place.dc) return place;
            break;
          }
        case NEARBY:
          {
            if (distance <= DISTANCE_KM && distance !== 0) return place;
            break;
          }

        default:
      }

    }).map( (place) =>{
      let distance = HaversineFormula(place, coordsOrigin);
      return {
        placeData: place,
        distance: distance
      }
    })

    console.log(filterData);
    this.Data = filterData;
    // alert(this.Store.length)
    this.sortEngine(DISTANCE);
  }

  searchForTeen = (coordsOrigin) =>{
    console.log('SEARCHENGINE TEEN');
    // let coordsOriginMock = {
    //   latitude: -34.4860687255859,
    //   longitude: -58.7250442504883
    // };
    let filterData = Object.values(this.Store).filter((place) => {
      // let distance = HaversineFormula(place, coordsOriginMock);
      let distance = HaversineFormula(place, coordsOrigin);

      if (distance <= DISTANCE_KM && distance !== 0 && isTeen(place)) return place;

    }).map( (place) =>{
      let distance = HaversineFormula(place, coordsOrigin);
      return {
        placeData: place,
        distance: distance
      }
    })

    console.log(filterData);
    this.Data = filterData;
    // alert(this.Data.length)
    this.sortEngine(DISTANCE);
  }

  searchForAutocomplete = (location) =>{
    console.log('SEARCHENGINE AUTOCOMPLETE');

    let filterData;

    filterData = Object.values(this.Store).filter((place) => {
      switch (this.Service) {
        case CON:
          {
            if(location.idPartido !== undefined){
              if (place.idCiudad === location.idObject && place.condones) return place;
            }
            else {
              if (place.idPartido === location.idObject && place.condones) return place;
            }
            break;
          }
        case VIH:
          {
            if(location.idPartido !== undefined){
              if (place.idCiudad === location.idObject && place.prueba) return place;
            }
            else {
              if (place.idPartido === location.idObject && place.prueba) return place;
            }
            break;
          }
        case SSR:
          {
            if(location.idPartido !== undefined){
              if (place.idCiudad === location.idObject && place.ssr) return place;
            }
            else {
              if (place.idPartido === location.idObject && place.ssr) return place;
            }
            break;
          }
        case MAC:
          {
            if(location.idPartido !== undefined){
              if (place.idCiudad === location.idObject && place.mac) return place;
            }
            else {
              if (place.idPartido === location.idObject && place.mac) return place;
            }
            break;
          }
        case LPI:
          {
            if(location.idPartido !== undefined){
              if (place.idCiudad === location.idObject && place.ile) return place;
            }
            else {
              if (place.idPartido === location.idObject && place.ile) return place;
            }
            break;
          }
        case DC:
          {
            if(location.idPartido !== undefined){
              if (place.idCiudad === location.idObject && place.dc) return place;
            }
            else {
              if (place.idPartido === location.idObject && place.dc) return place;
            }
            break;
          }

        default:
      }
    }).map( (place) =>{
      return {
        placeData: place,
      }
    })

    console.log(filterData);
    this.Data = filterData;
    // alert(this.Data.length)
    store.dispatch(setResultList(filterData))
  }

  sortEngine = (sortType, value) =>{
    if(sortType === RATE) {
      console.log('filtrar por rate');
      let ponderedDataset = this.Data.sort((a, b) => {
        return b.placeData.rateReal - a.placeData.rateReal
      })

      store.dispatch(setResultList(ponderedDataset))
    }
    else if(sortType === DISTANCE) {
      console.log('filtrar por distancia');
      let ponderedDataset = this.Data.sort((a, b) => {
        return a.distance - b.distance
      })

      console.log(ponderedDataset);
      store.dispatch(setResultList(ponderedDataset))

    }
    else if(sortType === TEEN) {
      console.log('filtro por teen');
      let filterForTeen = []
      if(value) {

        filterForTeen = this.Data.filter( (place) => {if(isTeen(place.placeData)) return place});
      }
      else {
        filterForTeen = this.Data;
      }

      console.log(filterForTeen);
      store.dispatch(setResultList(filterForTeen))
    }
    else console.log('cualquiera');
  }

  cleanResultList = () =>{
    console.log('CLEAN RESULTLIST');
    store.dispatch(setResultList([{empty:true}]))
  }
}
