import {
  normalizeBoolean,
  normalizePlace,
  normalizePlacesList,
  normalizeAndInsertEvaluationsList
} from '../../utils/normalizers'

import {
  UPDATE_PLACES,
  UPDATE_COUNTRIES,
  UPDATE_PROVINCES,
  UPDATE_CITIES,
  UPDATE_EVALUATIONS,
  FETCHING,
  UPDATE_STORE_DB
} from '../../constants/action-types'

import { _updateStore, _getStore } from '../../storage';

const initialState = {
  isFetching: false,
  places: {
    meta: {
      updatedAt: undefined,
      failedPages: []
    },
    data: []
  },
  countries: [],
  procinces: [],
  cities: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACES:
      {
        let data = normalizePlacesList(action.places)
        if(data.length !== 0){
          let storeRealm = _getStore("1");
          _updateStore(storeRealm,data,"places")
        }
        let currentData = state.places.data ? { ...state.places.data
        } : {}
        return Object.assign({}, state, {
          isFetching: false,
          places: {
            meta: {
              updatedAt: new Date(),
              failedPages: action.failedPages
            },
            data: Object.assign({}, currentData, { ...data
            })
          }
        })
        break
      }
    case UPDATE_COUNTRIES:
      {
        let countries = action.countries.map((country) => {
          return {
            id: country.id,
            name: country.nombre_pais,
            zoom: country.zoom
          }
        })
        return Object.assign(state, {
          countries
        })
        break
      }
    case UPDATE_PROVINCES:
      {
        let provinces = action.provinces.map((province) => {
          return {
            id: province.id,
            name: province.nombre_provincia
          }
        })
        return Object.assign(state, {
          provinces
        })
        break
      }
    case UPDATE_CITIES:
      {
        let cities = action.cities.map((city) => {
          return {
            id: city.id,
            name: city.nombre_partido
          }
        })
        return Object.assign(state, {
          cities
        })
        break
      }
    case UPDATE_EVALUATIONS:
      {
        return Object.assign(state, {
          places: {
            data: normalizeAndInsertEvaluationsList(state.places, action.evaluations)
          }
        })
        break
      }
    case FETCHING:
      {
        return {...state, isFetching:true}
        break
      }
    case UPDATE_STORE_DB:
      {
        // return Object.assign(state, {
        //   ...state,
        //   isFetching: false,
        //   places: {
        //     ...state.places,
        //     data: action.store
        //   }
        // })
        let store ={
          ...state,
          isFetching: false,
          places: {
            ...state.places,
            data: action.store
          }
        }
        // alert('store reducer '+ store.places.data.length);
        return store
        break
      }

    default:
      return state
  }
  return state
}
