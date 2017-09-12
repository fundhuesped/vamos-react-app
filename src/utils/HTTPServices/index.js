import store from '../../store/index.js'

import {updatePlaces, startFetching} from '../../constants/actions/index.js'
import {DAYSBEFOREUPDATE, URLPLACES} from '../../config/HTTP/index.js'

export class HTTPServices {
  constructor() {
    this.currentPage = 1;
    this.currentData = {};
    this.failedPages = {};
    this.totalPages = 1;
    this.nextUrl = URLPLACES;
    this.totalEstablishment = 0;
    this.to = 0;
  }

  fetchPlaces = async () => {
    store.dispatch(startFetching())
    // console.log('FIRTS FETCH BD');
    // alert('FIRTS FETCH BD');
    while (this.currentPage) {
      if(this.currentPage <= this.totalPages){
        try {
          let response = await fetch(this.nextUrl, {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                }})
          let responseJson = await response.json();

            this.totalEstablishment = responseJson.total;
            this.nextUrl = `${URLPLACES}/?page=${responseJson.current_page+1}`;
                // if(this.currentPage % 5 === 0) throw new Error('error')
                this.currentData[responseJson.current_page.toString()] = responseJson.data;
                this.totalPages = responseJson.last_page
                this.currentPage = responseJson.current_page;
                this.to = responseJson.to;
                if(this.totalPages === this.currentPage) this.currentPage += 1;
        } catch(error) {
          this.nextUrl = `${URLPLACES}/?page=${this.currentPage+1}`;
              this.currentPage = this.currentPage + 1;
        }
      }
      else {
        // alert(`termino de fetchear ${responseJson.last_page} paginas => ${responseJson.total} lugares`)
        this.currentPage = 0;
      }
    }
    // console.log('FINALIZADO FIRTS FETCH BD');
    // alert('FINALIZADO FIRTS FETCH BD');
    store.dispatch(updatePlaces(this.currentData,this.failedPages))
  }

  checkPlaces = async () => {
    // console.log('CHECKEANDO BD');
    // alert('CHECKEANDO BD');
    let lastUpdate = new Date(store.getState().db.places.meta.updatedAt) || new Date()
        currentDate = new Date(),
        differenceMiliseconds = currentDate.getTime() - lastUpdate.getTime(),
        differenceDays = (((differenceMiliseconds/1000)/60)/60)/24;

    let failedPages;

    if(differenceDays >= DAYSBEFOREUPDATE){
      console.log('BAJANDO BD NUEVAMENTE');
      // alert('BAJANDO BD NUEVAMENTE');
      _fetchPlaces();
    }else {
      failedPages = store.getState().db.places.meta.failedPages,
          newFailedPages = {};
          console.log(failedPages);
      for (let i in failedPages) {
        console.log(failedPages[i],i);
          let nextUrl = `https://ippf-staging.com.ar/api/v2/places/getall/?page=${i}`,
              place;
          try {
            let response = await fetch(nextUrl, {
                                  method: 'GET',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                  }})
            let responseJson = await response.json();
            // if(currentPage % 5 === 0) throw new Error('error')
            failedPages[i.toString()] = responseJson.data;
          } catch(error) {
            newFailedPages[i.toString()] = null;
          }
      }
    }

    // console.log('FINALIZADO CHECKEANDO BD');
    // alert('FINALIZADO CHECKEANDO BD');
    store.dispatch(updatePlaces(failedPages,newFailedPages))
  }

  getCurrentPage = () => {
    return {currentPlaces: this.to, totalEstablishment: this.totalEstablishment}
  };

  cleanState = () =>{
    this.currentPage = 1;
    this.currentData = {};
    this.failedPages = {};
    this.totalPages = 1;
    this.nextUrl = URLPLACES;
    this.totalEstablishment = 0;
    this.to = 0;
  }
}

export let HTTPService = new HTTPServices();

export const _fetchCountries = async () => {}

export const _fetchProvinces = async () => {}

export const _fetchCities = async () => {}

export const _fetchEvaluations = async () => {}
