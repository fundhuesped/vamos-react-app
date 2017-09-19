import React from 'react';
import { Text, StyleSheet,View, Animated } from 'react-native';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Animation from 'lottie-react-native';
import {HTTPService} from '../../../utils/HTTPServices/index.js';

const MAX_POINTS = 100;

export default class ProgressCircle extends React.Component {

  constructor(){
    super();
    this.state = {
      progress: new Animated.Value(0),
      currentPlaces: "",
      totalEstablishment: "",
      cityOrPlace: ''
      // loop: true
      // progress: 1
    }
  }




  componentDidMount() {
    this.animation.play();

    this.interval = setInterval(() => {
      let downloadStatus = HTTPService.getCurrentPage()
      if(this.state.currentPlaces !== downloadStatus.currentPage) this.setState({currentPlaces: downloadStatus.currentPlaces, totalEstablishment: downloadStatus.totalEstablishment, cityOrPlace: downloadStatus.cityOrPlace })
      console.log('intervalo ',downloadStatus.currentPage);
    }, 500);

    console.log(this.props.firstFetch);
  }

  _renderProgress = () => {
    let progress;
    if(this.state.cityOrPlace === 'place'){
      if(this.state.currentPlaces !== 0) progress = (
        <Text style={styles.loaderText}>{(this.state.totalEstablishment) ?`Descargando ${this.state.currentPlaces} establecimientos de ${this.state.totalEstablishment}` : ""}</Text>
      )
      else progress = (
        <Text style={styles.loaderText}>Guardando establecimientos</Text>
      )
    }
    else  progress = (
      <Text style={styles.loaderText}>Descargando Ciudades</Text>
    )

    return progress
  }

  componentWillUnmount = () => clearInterval(this.interval)

  render() {
    return (
      (this.props.downloading) ? (
        <View style={styles.animationContainer}>

          <Text style={styles.loaderTitle}>{(this.props.firstFetch) ? 'Bienvenid@' : 'Descargando'}</Text>
          <View style={{paddingHorizontal: '20%'}}>
            <Text style={styles.loaderText}>{(this.props.firstFetch) ? 'Estamos descargando todos nuestros establecimientos, para que puedas disfrutar de una experiencia totalmente offline' : 'Estamos renovando los establecimientos actuales'}</Text>
          </View>
          <Animation
            ref={animation => { this.animation = animation; }}
            style={{
              width: '50%',
              height: '50%',
            }}
            source={require('../../../assets/animations/data.json')}
            loop={true}
          />
          <View style={{paddingHorizontal: '20%'}}>
            {this._renderProgress()}
          </View>
        </View>
      ) : (
        <View style={styles.animationContainer}>
          <Animation
            ref={animation => { this.animation = animation; }}
            style={{
              width: '50%',
              height: '50%',
            }}
            source={require('../../../assets/animations/data.json')}
            loop={true}
          />
        </View>
      )

    )
  }

}

const styles = StyleSheet.create({
  animationContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  progressBarText:{
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 65,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: '#e6334c',
    fontSize: 50,
    fontWeight: "100",
  },
  loaderText:{
    color: '#e6334c',
    fontSize: 14,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  loaderTitle:{
    color: '#e6334c',
    fontSize: 30,
    marginBottom: 20,
  }
})
