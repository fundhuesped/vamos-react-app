import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Spinner, CheckBox,DeviceEventEmitter } from 'native-base';
import {View, StyleSheet,Picker, NetInfo, Modal, Text, Dimensions, TouchableHighlight} from 'react-native'
import { StyleProvider } from 'native-base';
import getTheme from '../../config/styles/native-base-theme/components';
import platform from '../../config/styles/native-base-theme/variables/platform';
import PlacePreviewList from '../../components/Dummy/PlacePreviewList/component.js'
import SVGVamosLogo from '../../components/Dummy/SVG/VamosLogo/component.js'
import I18n from '../../config/i18n/index.js';

import {RATE, DISTANCE, TEEN} from '../../constants/action-types/index.js'

import {getServiceData} from '../../utils/engines/index.js'

import PlacePreviewItem from '../../components/Dummy/PlacePreviewItem/component.js'

const {width} = Dimensions.get('window');

export default class SearchForGeolocation extends React.Component {

  constructor(){
    super();
    this.state={
      loaded: false,
      sortEngine: DISTANCE,
      address: 'Obteniendo dirección',
      showModal: false,
      isTeen: false
    }
  }

  componentDidMount = () => {
    console.log('MOUNT ', this.props);
    // setTimeout(() => { this.setState({loaded:true}) }, 1000);
    if(this.props.store[0] === undefined || this.props.store[0].empty === undefined ) this.setState({loaded:true})
    this._getAddress();
  }

  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.store[0] === undefined || nextProps.store[0].empty === undefined ) this.setState({loaded:true})
    console.log('NEXTPROPS ', nextProps);
  }

  _goToMap = () =>{
    NetInfo.isConnected.fetch().then(isConnected => {
      let conection = isConnected ? 'online' : 'offline'
      console.log('First, is ' + conection);
      isConnected ? this.props.navigation.navigate('Map') : this.setState({showModal:true})
    });
  }

  _renderView = () =>{
    let view;
    if(this.state.loaded){
      if(this.props.store.length !== 0){
        view = (
          <View>
            <PlacePreviewList store={this.props.store} navigation={this.props.navigation} />
          </View>
        )
      }else {
        view = (
          <View>
            <Text style={{color:'#655E5E'}}>
              No hay establecimientos cercanos
            </Text>
          </View>
        )
      }

    }else {
      view = (
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 20, color:'#655E5E'}}>{I18n.t("cargando_cercanos", {locale: this.props.lang})}</Text>
          <Spinner color='#e6334c' />
        </View>
      )
    }

    return view
  }

  _getAddress = async () =>{
    let url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.coords.latitude},${this.props.coords.longitude}&sensor=false`;
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
        address_components.forEach(element => {
            address[element.types[0]] = element.long_name;
        });


        let addressFormated = {
              formatted_address: responseJson.results[0].formatted_address,
              address_parts: address
          };

        // alert(this.props.coords.latitude +' '+ this.props.coords.longitude +' '+ addressFormated.formatted_address);
        this.setState({address:addressFormated})
      }
    } catch (e) {
      console.log(e);
    }

  }

  render() {
    let serviceData = getServiceData(this.props.serviceTypeData, width/10)
    let location ={
      pais: this.state.address,
      provincia: false,
      partido: false,
      ciudad: false
    }
    if(typeof this.state.address !== 'string') location = {
      pais: this.state.address.address_parts.country || null,
      provincia: this.state.address.address_parts.administrative_area_level_1 || null,
      partido: this.state.address.address_parts.administrative_area_level_2 || null,
      ciudad: this.state.address.address_parts.locality || null
    }
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header
            style={{backgroundColor:'#E6642F'}}
            >
            <Left style={{flex:1}}>
              <Button
                transparent
                onPress={()=>{this.props.navigation.goBack()}}
                >
                <Icon name="ios-arrow-back"/>
              </Button>
            </Left>
            <Body style={{flex:1,  justifyContent:'flex-start'}}>
              <SVGVamosLogo
                height={140}
                width={140}
              />
            </Body>
          <Right style={{flex:1}}/>
          </Header>
          <Content
            contentContainerStyle ={{
              flex:1,
              backgroundColor:"#FFFFFF",
              alignItems: 'center'
              }}
          >
            <View style={styles.container}>
              <View style={styles.headerService}>
                <View style={styles.headerServiceIcon}>
                  {serviceData.svg}
                </View>
                <View style={styles.headerServiceTitleContainer}>
                  <Text style={styles.headerServiceTitle}>{serviceData.title.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.serviceBreadcrumbLocation}>
                {(location.pais) ? <Text style={styles.serviceBreadcrumbLocationText}>{location.pais}</Text> : null }
                {(location.pais) ? <Icon name="ios-arrow-forward" style={{fontSize: 12, color: '#e6334c', marginHorizontal: '1%'}}/> : null }
                {(location.provincia) ? <Text style={styles.serviceBreadcrumbLocationText}>{location.provincia}</Text> : null }
                {(location.provincia) ? <Icon name="ios-arrow-forward" style={{fontSize: 12, color: '#e6334c', marginHorizontal: '1%'}}/> : null }
                {(location.partido) ? <Text style={styles.serviceBreadcrumbLocationText}>{location.partido}</Text> : null }
                {(location.partido) ? <Icon name="ios-arrow-forward" style={{fontSize: 12, color: '#e6334c', marginHorizontal: '1%'}}/> : null }
                {(location.ciudad) ? <Text style={styles.serviceBreadcrumbLocationText}>{location.ciudad}</Text> : null }
              </View>
              {(this.props.serviceTypeData !== TEEN) ? (
                <TouchableHighlight
                  onPress={() => this.setState({isTeen: !this.state.isTeen } , () => this.props._changeSortValue(TEEN,this.state.isTeen))}
                  activeOpacity={0}
                  underlayColor="#FFFFFF"
                  style={{marginTop: '10%'}}
                  >
                  <View style={styles.isTeenContainer}>
                    <CheckBox
                      onPress={() => this.setState({isTeen: !this.state.isTeen } , () => this.props._changeSortValue(TEEN,this.state.isTeen))}
                      checked={this.state.isTeen}
                      color={"#e6334c"}
                    />
                    <Text style={[{marginLeft: 20, flex:1}, styles.serviceBreadcrumbLocationText]}>{I18n.t("only_teenager_friendly", {locale: this.props.lang})}</Text>
                  </View>
                </TouchableHighlight>
              ) : (null)}
              <View style={styles.serviceContainerSort}>
                <Text style={{flex:1, color:'#655E5E'}}>{`${I18n.t("sort_label_text", {locale: this.props.lang})}`}</Text>
                <View style={styles.serviceContainerSortInput}>
                  <Picker
                    selectedValue={this.state.sortEngine}
                    onValueChange={(itemValue, itemIndex) => this.setState({sortEngine: itemValue}, ()=>{this.props._changeSortValue(itemValue)})}>
                    <Picker.Item label={I18n.t("sort_closest_option", {locale: this.props.lang})} value={DISTANCE} color="#000"/>
                    <Picker.Item label={I18n.t("sort_better_option", {locale: this.props.lang})} value={RATE} color="#000"/>
                  </Picker>
                </View>
              </View>
              <View style={styles.serviceGeolocation}>
                <Button
                  bordered
                  block
                  style={{borderColor: 'rgba(0, 0, 0, 0)', elevation: 2}}
                  onPress={this._goToMap}
                  >
                  <Icon name='md-pin' style={{fontSize: 25, color: '#e6334c'}}/>
                  <Text style={{color: "#e6334c"}}>{I18n.t("panel_detail_general_map_localization", {locale: this.props.lang})}</Text>
                </Button>
              </View>
              <View style={styles.flatlistContainer}>
                {this._renderView()}
              </View>
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.showModal}
                onRequestClose={() => {console.log("Modal has been closed.")}}
                >
               <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <View style={styles.modalViewTitle}>
                    <Text style={{fontWeight:'bold',fontSize:16}}>SIN CONEXIÓN</Text>
                  </View>
                  <View style={styles.modalViewDescription}>
                    <View style={styles.modalViewDescriptionIcon}>
                      <Icon name="md-warning" style={{fontSize: 50, color: '#e6334c'}}/>
                    </View>
                      <Text style={{flex: 1, color:'#5d5d5d', fontSize: 16}}>Para acceder al mapa debes estar conectado a una red wifi o mediante datos</Text>
                  </View>
                  <View style={styles.modalViewActions}>
                    <View>
                      <Button
                        onPress={() => this.setState({showModal:false})}
                        // style={{marginBottom:'5%'}}
                        >
                        <Text style={{color:'#FFFFFF',marginHorizontal: '20%'}}>Volver</Text>
                      </Button>
                    </View>
                  </View>
                </View>
               </View>
              </Modal>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: '10%',
    width: width / 1.2,
  },
  headerService:{
    borderBottomWidth: 2,
    borderBottomColor: "#e6334c",
    paddingBottom: '3%',
    flexDirection: 'row'
  },
  headerServiceIcon:{
    borderRightWidth: 2,
    borderRightColor: "#e6334c",
    justifyContent: 'center',
    padding: '1%'
  },
  headerServiceTitle:{
    color: "#e6334c",
    fontSize: 20,
  },
  headerServiceTitleContainer:{
    justifyContent: 'center',
    paddingLeft: '2.5%',
    flex: 1
  },
  serviceBreadcrumbLocation:{
    alignItems: 'center',
    flexDirection:'row',
    borderBottomWidth: 2,
    borderBottomColor: "#e6334c",
    flexWrap: 'wrap'
  },
  serviceBreadcrumbLocationText:{
    color: '#655E5E',
  },
  serviceContainerSort:{
    flexDirection: 'row',
    marginVertical: '5%',
    alignItems: 'center',
    width: '100%',
  },
  serviceContainerSortInput:{
    borderRadius: 5,
    backgroundColor:'#e6334c',
    alignSelf: 'stretch',
    // width: width / 1.2,
    flex: 4,
    height: 50
  },
  serviceGeolocation:{
    marginBottom: '5%',
  },
  // header:{
  //   alignItems:'center',
  //   height: '10%'
  // },
  flatlistContainer:{
    flex:1,
  },
  isTeenContainer:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalContainer:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    paddingHorizontal: '5%'
  },
  modalView:{
    backgroundColor: '#FFFFFF',
    padding: '5%',
    borderRadius: 5,
  },
  modalViewTitle:{
    alignItems: 'center'
  },
  modalViewDescription:{
    marginVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalViewDescriptionIcon:{
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%'
  },
  modalViewActions:{
    justifyContent: 'center',
    alignItems: 'center',
  }
})
