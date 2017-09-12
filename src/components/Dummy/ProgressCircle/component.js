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
      totalEstablishment: ""
      // loop: true
      // progress: 1
    }
  }


  // componentWillReceiveProps = (nextProps) =>{
  //   console.log(nextProps);
  //   let progress = (nextProps.totalProgress * nextProps.progress) / 100
  //   if(nextProps.progress === 0 && nextProps.totalProgress !== 0 ) progress = 100
  //   console.log(progress);
  //   // this.setState({progress})
  // }
  //
  // componentDidMount() {
  //   Animated.timing(this.state.progress, {
  //     toValue: 1,
  //     duration: 5000,
  //   }).start();
  // }

  componentDidMount() {
    this.animation.play();
    // setTimeout( () => {
    //   this.setState({loop:false})
    // }, 5000);

    this.interval = setInterval(() => {
      let downloadStatus = HTTPService.getCurrentPage()
      if(this.state.currentPlaces !== downloadStatus.currentPage) this.setState({currentPlaces: downloadStatus.currentPlaces, totalEstablishment: downloadStatus.totalEstablishment})
      console.log('intervalo ',downloadStatus.currentPage);
    }, 500);

    console.log(this.props.firstFetch);
  }

  componentWillUnmount = () => clearInterval(this.interval)

  render() {
    // console.log(this.state.progress);
    return (
      (this.props.downloading) ? (
        <View style={styles.animationContainer}>
          {/* <AnimatedCircularProgress
            size={200}
            width={2}
            fill={this.state.progress}
            tintColor="#e6334c"
            backgroundColor="#FFFFFF">
            {
              (fill) => (
                <Text style={styles.progressBarText}>
                  { Math.round(MAX_POINTS * fill / 100) }
                </Text>
              )
            }
          </AnimatedCircularProgress> */}
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
            // source={require('../../../assets/animations/splashy_loader.json')}
            source={require('../../../assets/animations/data.json')}
            // progress={this.state.progress}
            loop={true}
          />
          <View style={{paddingHorizontal: '20%'}}>
            {(this.state.currentPlaces !== 0) ? (
              <Text style={styles.loaderText}>{(this.state.currentPlaces !== "" && this.state.totalEstablishment !== "") ?`Descargando ${this.state.currentPlaces} establecimientos de ${this.state.totalEstablishment}` : ""}</Text>
            ) : (
              <Text style={styles.loaderText}>Guardando establecimientos</Text>
            )}

          </View>
        </View>
      ) : (
        <View style={styles.animationContainer}>
          {/* <AnimatedCircularProgress
            size={200}
            width={2}
            fill={this.state.progress}
            tintColor="#e6334c"
            backgroundColor="#FFFFFF">
            {
              (fill) => (
                <Text style={styles.progressBarText}>
                  { Math.round(MAX_POINTS * fill / 100) }
                </Text>
              )
            }
          </AnimatedCircularProgress> */}
          <Animation
            ref={animation => { this.animation = animation; }}
            style={{
              width: '50%',
              height: '50%',
            }}
            source={require('../../../assets/animations/data.json')}
            // progress={this.state.progress}
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
