import {
  CON,
  VIH,
  SSR,
  MAC,
  LPI,
  DC,
  TEEN,
  RATE,
  DISTANCE
} from '../../constants/action-types';
import React from "react"
import store from '../../store';
import I18n from '../../config/i18n/index.js';

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

const isTeen = (place) => (place.friendly_condones || place.friendly_dc || place.friendly_ile || place.friendly_infectologia || place.friendly_mac || place.friendly_prueba || place.friendly_ssr || place.friendly_vacunatorios)

export const getServiceData = (service, size) => {
  let serviceData;
  switch (service) {
    case CON:
      serviceData = {
        svg: <SVGCondomIcon height={size}
        width={size}/>,
        title: I18n.t("condones_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("condones_content", {locale: store.getState().ui.lang})
      }
      break;
    case VIH:
      serviceData = {
        svg: <SVGVIHIcon height={size}
        width={size}/>,
        title: I18n.t("prueba_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("prueba_content", {locale: store.getState().ui.lang})
      }
      break;
    case SSR:
      serviceData = {
        svg:<SVGHealthIcon height={size}
        width={size}/>,
        title: I18n.t("ssr_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("ssr_content", {locale: store.getState().ui.lang})
      }
      break;
    case MAC:
      serviceData = {
        svg:<SVGMACIcon height={size}
        width={size}/>,
        title: I18n.t("mac_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("mac_content", {locale: store.getState().ui.lang})
      }
      break;
    case LPI:
      serviceData = {
        svg:<SVGILEIcon height={size}
        width={size}/>,
        title: I18n.t("ile_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("ile_content", {locale: store.getState().ui.lang})
      }
      break;
    case DC:
      serviceData = {
        svg:<SVGDetectionIcon height={size}
        width={size}/>,
        title: I18n.t("dc_name", {locale: store.getState().ui.lang}),
        subtitle: I18n.t("dc_content", {locale: store.getState().ui.lang})
      }
      break;
    case TEEN:
      serviceData = {
        svg:<SVGTeenIcon height={size}
        width={size}/>,
        title: I18n.t("friendly_service_label", {locale: store.getState().ui.lang}),
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
            if (distance <= 10 && distance !== 0 && place.condones) return place;
            break;
          }
        case VIH:
          {
            if (distance <= 10 && distance !== 0 && place.prueba) return place;
            break;
          }
        case SSR:
          {
            if (distance <= 10 && distance !== 0 && place.ssr) return place;
            break;
          }
        case MAC:
          {
            if (distance <= 10 && distance !== 0 && place.mac) return place;
            break;
          }
        case LPI:
          {
            if (distance <= 10 && distance !== 0 && place.ile) return place;
            break;
          }
        case DC:
          {
            if (distance <= 10 && distance !== 0 && place.dc) return place;
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

      if (distance <= 10 && distance !== 0 && isTeen(place)) return place;

    }).map( (place) =>{
      let distance = HaversineFormula(place, coordsOrigin);
      return {
        placeData: place,
        distance: distance
      }
    })

    console.log(filterData);
    this.Data = filterData;
    this.sortEngine(DISTANCE);
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
        filterForTeen = this.Data.filter( (place) => {if(isTeen(place)) return place});
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
