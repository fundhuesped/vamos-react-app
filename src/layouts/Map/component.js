import React from 'react';
import { NavigationActions } from 'react-navigation'
import MapView from 'react-native-maps';
import { Container, Header, Title, Button, Left, Right, Icon, Body } from 'native-base';
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Animated,
  Image,
  Text
} from 'react-native';
import { StyleProvider } from 'native-base';
import getTheme from '../../config/styles/native-base-theme/components';
import platform from '../../config/styles/native-base-theme/variables/platform';
import PlacePreviewItem from '../../components/Dummy/PlacePreviewItem/component.js'
import SVGVamosLogo from '../../components/Dummy/SVG/VamosLogo/component.js'
import ProgressCircle from '../../components/Dummy/ProgressCircle/component.js'

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width / 1.2;

const iconMarker = require('../../assets/images/marker.png');
const selectedIconMarker = require('../../assets/images/marker-selected.png');

export default class Map extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      selectedMarkerIndex: null,
      isPicked: true,
      errorMessage: null,
        region: {
        latitude: props.coords.latitude,
        longitude: props.coords.longitude,
        latitudeDelta: 0.05777554384854611,
        longitudeDelta: 0.04632476717233658,
      }
    }
  }

  componentWillMount() {
    console.log(this.props);
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount = () => {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      // console.log(value);
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.props.store.length) {
        index = this.props.store.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      console.log(index);
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          let latitude = this.props.store[index].placeData.latitude,
              longitude = this.props.store[index].placeData.longitude;
          console.log(this.state.selectedMarkerIndex, index);
          if(this.state.selectedMarkerIndex !== index && this.state.isPicked){
            this.setState({selectedMarkerIndex: index, isPicked:true})
            this.map.animateToRegion(
              {
                latitude,
                longitude,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
              },
              350
            );
          }
        }
      }, 10);
    });

    setTimeout( () => {
      this.setState({loaded:true})
    }, 1500);
  }



  _scrollToAnimatedScrollView = (e, index) =>{
    console.log(index);
    this.setState({selectedMarkerIndex: index, isPicked:true}, () => {
      let distanceToCard = (CARD_WIDTH + 20) * index;
      // alert(distanceToCard)
      this.refs.scrollRef._component.scrollTo({x: distanceToCard, animated: false})
    });
  }

  _goToLanding = () =>{
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Landing'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }


  render() {
    console.log(this.state.region.latitude);
    console.log(this.state.region.longitude);
    console.log(this.state.region.latitudeDelta);
    console.log(this.state.region.longitudeDelta);
    console.log(this.state.location);
    console.log(this.state.errorMessage);

    const interpolations = this.props.store.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 2.5, 1],
          extrapolate: "clamp",
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });
        return { scale, opacity };
      });

    return (
      (this.state.loaded) ? (
        <StyleProvider style={getTheme(platform)}>
          <Container>
            <Header
              style={{backgroundColor:'#E6642F'}}
              >
              <Left
                style={{flex:1}}
                >
                <Button
                  transparent
                  onPress={()=>{this.props.navigation.goBack()}}
                  >
                  <Icon name="ios-arrow-back"/>
                </Button>
              </Left>
              <Body style={{flex:1,  justifyContent:'flex-start'}}>
                <Button
                  transparent
                  onPress={this._goToLanding}
                  >
                  <SVGVamosLogo
                    height={140}
                    width={140}
                  />
                </Button>
              </Body>
            <Right style={{flex:1}}>
            </Right>
            </Header>
            <MapView
              ref={map => this.map = map}
              initialRegion={this.state.region}
              style={styles.container}
              >
                {this.props.store.map((marker, index) => {
                  const scaleStyle = {
                    transform: [
                      {
                        scale: interpolations[index].scale,
                      },
                    ],
                  };
                  const opacityStyle = {
                    opacity: interpolations[index].opacity,
                  };
                  let coords = {latitude:parseInt(marker.placeData.latitude),longitude:parseInt(marker.placeData.longitude)}
                  return (
                    <MapView.Marker
                      key={index}
                      coordinate={marker.placeData}
                      onPress={(e) => this._scrollToAnimatedScrollView(e,index)}
                      >
                        <Image
                          source={this.state.selectedMarkerIndex === index ? selectedIconMarker : iconMarker}
                          style={styles.markerImage}
                        />
                    </MapView.Marker>
                  );
                })}
              </MapView>
              <Animated.ScrollView
                ref='scrollRef'
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {
                          x: this.animation,
                        },
                      },
                    },
                  ],
                  { useNativeDriver: true }
                )}
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding}
              >
                {this.props.store.map((marker, index) => (
                  <View style={styles.card} key={index}>
                    <PlacePreviewItem
                      data={marker}
                      navigation={this.props.navigation}
                      onPressItem={()=>{}}
                    />
                  </View>
                ))}
              </Animated.ScrollView>
          </Container>
        </StyleProvider>
      ) : (<ProgressCircle downloading={false}/>)
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    // height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  textContent: {
    flex: 1,
  },
  markerImage:{
    width: width / 6,
    height: width / 6
  }
});
