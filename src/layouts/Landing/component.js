import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, ScrollView, Modal } from 'react-native';
import { Container, Header, Content, Button, Left, Right, Body, Icon } from 'native-base';
import { StyleProvider } from 'native-base';
import getTheme from '../../config/styles/native-base-theme/components';
import platform from '../../config/styles/native-base-theme/variables/platform';

import {selectLookingFor} from '../../constants/actions/index.js'
import I18n from '../../config/i18n/index.js';

import SVGVamosLogo from '../../components/Dummy/SVG/VamosLogo/component.js'
import SVGCondomIcon from '../../components/Dummy/SVG/CondomIcon/component.js'
import SVGDetectionIcon from '../../components/Dummy/SVG/DetectionIcon/component.js'
import SVGHealthIcon from '../../components/Dummy/SVG/HealthIcon/component.js'
import SVGILEIcon from '../../components/Dummy/SVG/ILEIcon/component.js'
import SVGMACIcon from '../../components/Dummy/SVG/MACIcon/component.js'
import SVGTeenIcon from '../../components/Dummy/SVG/TeenIcon/component.js'
import SVGVIHIcon from '../../components/Dummy/SVG/VIHIcon/component.js'

import {
  CON,
  VIH,
  SSR,
  MAC,
  LPI,
  DC,
  TEEN
} from '../../constants/action-types'

const {width} = Dimensions.get('window');

export default class Landing extends React.Component {

  constructor(){
    super();
    this.state={
      showModal: false
    }
  }

  _handleService = (service) => this.props._handleService(service)

  _goToGeolocation = () =>{
    this._handleService(TEEN)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // alert('gps activado');
        this.props.navigation.navigate('SearchForGeolocation',{isTeen: true})
      },
      (error) => {
        this.setState({showModal:true})
        // alert('error yendo a geolocalizacion'+error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header
            style={{backgroundColor:'#E6642F'}}
            >
            <Left style={{flex:1}}/>
            <Body
              style={{flex:1}}
              >
              <SVGVamosLogo
                height={140}
                width={140}
              />
            </Body>
            <Right
              style={{flex:1}}
              >
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
                >
                <Icon name='menu' style={{fontSize: 24}}/>
              </Button>
            </Right>
          </Header>
          <Content
            contentContainerStyle ={{
              flex:1,
              backgroundColor:"#FFFFFF",
              }}
          >
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.container}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <TouchableHighlight
                      onPress={()=>{this._handleService(CON)}}
                      style={styles.box}
                      activeOpacity={0.5}
                      underlayColor="white"
                      >
                      <View style={styles.boxContent}>
                        <SVGCondomIcon
                          height={(width/5)}
                          width={(width/5)}
                        />
                        <Text style={styles.boxContentText}>{I18n.t("condones_name", {locale: this.props.lang})}</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={()=>{this._handleService(MAC)}}
                      style={styles.box}
                      activeOpacity={0.5}
                      underlayColor="white"
                      >
                        <View style={styles.boxContent}>
                          <SVGMACIcon
                            height={(width/5)}
                            width={(width/5)}
                          />
                          <Text style={styles.boxContentText}>{I18n.t("mac_name", {locale: this.props.lang})}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={()=>{this._handleService(DC)}}
                      style={styles.box}
                      activeOpacity={0.5}
                      underlayColor="white"
                      >
                        <View style={styles.boxContent}>
                          <SVGDetectionIcon
                            height={(width/5)}
                            width={(width/5)}
                          />
                          <Text style={styles.boxContentText}>{I18n.t("dc_name", {locale: this.props.lang})}</Text>
                        </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.column}>
                    <TouchableHighlight
                      onPress={()=>{this._handleService(VIH)}}
                      style={styles.box}
                      activeOpacity={0.5}
                      underlayColor="white"
                      >
                        <View style={styles.boxContent}>
                          <SVGVIHIcon
                            height={(width/5)}
                            width={(width/5)}
                          />
                          <Text style={styles.boxContentText}>{I18n.t("prueba_name", {locale: this.props.lang})}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={()=>{this._handleService(LPI)}}
                      style={styles.box}
                      activeOpacity={0.5}
                      underlayColor="white"
                      >
                        <View style={styles.boxContent}>
                          <SVGILEIcon
                            height={(width/5)}
                            width={(width/5)}
                          />
                          <Text style={styles.boxContentText}>{I18n.t("ile_name", {locale: this.props.lang})}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={()=>{this._handleService(SSR)}}
                      style={styles.box}
                      activeOpacity={0.5}
                      underlayColor="white"
                      >
                        <View style={styles.boxContent}>
                          <SVGHealthIcon
                            height={(width/5)}
                            width={(width/5)}
                          />
                          <Text style={styles.boxContentText}>{I18n.t("ssr_name", {locale: this.props.lang})}</Text>
                        </View>
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.lastRow}>
                  <TouchableHighlight
                    onPress={()=>{this._goToGeolocation()}}
                    style={[styles.lastBox]}
                    activeOpacity={0.5}
                    underlayColor="white"
                    >
                      <View style={styles.lastboxContent}>
                        <SVGTeenIcon
                          height={(width/7)}
                          width={(width/7)}
                        />
                        <Text style={styles.boxContentText}>{I18n.t("friendly_service_label", {locale: this.props.lang})}</Text>
                      </View>
                  </TouchableHighlight>
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
                      <Text style={{fontWeight:'bold',fontSize:16}}>GPS</Text>
                    </View>
                    <View style={styles.modalViewDescription}>
                      <View style={styles.modalViewDescriptionIcon}>
                        <Icon name="md-warning" style={{fontSize: 50, color: '#e6334c'}}/>
                      </View>
                        <Text style={{flex: 1, color:'#5d5d5d', fontSize: 16}}>Para acceder a la busqueda por adolescente amigbable debes activar tu gps</Text>
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
            </ScrollView>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container:{
    flex:1,
    paddingVertical: 20,
    paddingHorizontal: width / 12,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lastRow:{
    flex:1
  },
  box:{
    elevation: 2,
    width: width / 2.6,
    height: width / 2.8,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 20
  },
  lastBox:{
    elevation: 2,
    height: width / 5.6,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 20
  },
  boxContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lastboxContent:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  boxContentText:{
    textAlign:'center',
    paddingHorizontal: 10,
    color: '#e6354d',
    fontFamily: 'OpenSans',
    fontSize: width/35
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
});
