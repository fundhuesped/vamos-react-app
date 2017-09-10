import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon} from 'native-base';
import {View, Image, StyleSheet, Dimensions, Text, TextInput, TouchableHighlight, Modal} from 'react-native';
import { StyleProvider } from 'native-base';
import getTheme from '../../config/styles/native-base-theme/components';
import platform from '../../config/styles/native-base-theme/variables/platform';
import SVGVamosLogo from '../../components/Dummy/SVG/VamosLogo/component.js'
import I18n from '../../config/i18n/index.js';

import {getServiceData} from '../../utils/engines/index.js'

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

export default class Services extends React.Component {

  constructor(){
    super();
    this.state = {
      textInput: "",
      showModal: false
    }
  }

  _goToGeolocation = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // alert('gps activado');
        this.props.navigation.navigate('SearchForGeolocation',{coords: position.coords})
      },
      (error) => {
        this.setState({showModal:true})
        // alert('error yendo a geolocalizacion'+error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    let serviceData = getServiceData(this.props.serviceTypeData, width/10)
    return (
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
              <SVGVamosLogo
                height={140}
                width={140}
              />
            </Body>
          <Right style={{flex:1}}>
          </Right>
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
              <View style={styles.infoContainer}>
                <Text style={styles.infoContainerText}>{serviceData.subtitle}</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.containerSearchCity}>
                  <Icon name="md-search" style={{fontSize: 30, color: '#FFFFFF'}}/>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({textInput:text})}
                    value={this.state.textInput}
                    placeholder={I18n.t("search_department_description", {locale: this.props.lang})}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
                </View>
                  <TouchableHighlight
                    onPress={this._goToGeolocation}
                    style={{borderRadius: 5}}
                    activeOpacity={0.5}
                    underlayColor="#e6334c"
                    >
                    <View style={styles.containerGeolocation}>
                      <Icon name='md-pin' style={{fontSize: 30, color: '#FFFFFF'}}/>
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
                      <Text style={{flex: 1, color:'#5d5d5d', fontSize: 16}}>Para acceder a la busqueda por geolocalización debes activar tu gps</Text>
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
    marginTop: '10%',
    width: width / 1.2,
    height: 150
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
  infoContainer:{
    marginTop: '2.5%'
  },
  infoContainerText:{
    fontSize: 16,
    color: "#655E5E",
    textAlign: 'left'
  },
  inputContainer:{
    backgroundColor: "#e6334c",
    marginTop: '2.5%',
    borderRadius: 5,
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput:{
    marginLeft: '5%',
    width: 200,
    color: '#FFFFFF',
    height: 40,
  },
  containerSearchCity:{
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: '2%',
    alignItems: 'center',
  },
  containerGeolocation:{
    width:50,
    justifyContent:'center',
    alignItems: 'center',
    flex:1,
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
