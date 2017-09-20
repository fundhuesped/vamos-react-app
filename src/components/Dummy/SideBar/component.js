import React, { Component } from "react";
import {Text,View,StyleSheet,Image, Button, Linking, Picker, Modal, TouchableHighlight} from 'react-native'
import {Toast, Icon} from 'native-base';
import {connect} from 'react-redux'

import {setLang, selectLookingFor} from '../../../constants/actions/index.js'
import {EN, ES, NEARBY} from '../../../constants/action-types/index.js'
import I18n from '../../../config/i18n/index.js';
import {HTTPService} from '../../../utils/HTTPServices/index.js';

function mapStateToProps(store) {
    return {db: store.db, ui: store.ui}
}

class SideBar extends Component {

  constructor(props){
    super(props);
    this.state ={
      language: props.ui.lang,
      modalVisible: false,
      modalType: false
    }
  }

  // componentDidMount = () => this.setState({language:I18n.currentLocale()})
  // componentDidMount = () => console.log(this.props.ui.lang);

  _setModalVisible = (visible,isFetching) => (!isFetching) ? this.setState({modalVisible: visible}) : this.setState({modalVisible: visible}, () => {
    HTTPService.cleanState();
    HTTPService.fetchPlaces();
    this.props.navigation.navigate('DrawerClose')
  })


  _reloadBD = () =>{
    console.log('recargarBD');
    if(this.props.db.places.data.length === 0){
      Toast.show({
                text: 'TODAVIA NO HAY DATOS EN LA BD!',
                position: 'bottom',
                buttonText: 'OK',
                duration: 2000
              })
    }else {
      this._setModalVisible(true,false)
    }
  }

  _refetch = () => this._setModalVisible(false,true)

  _goToAbout = () =>{
    let url = 'https://ippf-staging.com.ar/#/acerca';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _goToSuggest = () =>{
    let url = 'https://ippf-staging.com.ar/form';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _getDate = () =>{
    let date =  new Date(this.props.db.places.meta.updatedAt),
        dd = date.getDate(),
        mm = date.getMonth()+1,
        yyyy = date.getFullYear();

    if(dd<10) dd = `0${dd}`;
    if(mm<10) mm = `0${mm}`;

    let formatDate = `${dd}/${mm}/${yyyy}`;

    return formatDate
  }

  _goToNearby = () =>{
    this.props.dispatch(selectLookingFor(NEARBY))
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // alert('gps activado');
        this.props.navigation.navigate('InfoCountry',{coords: position.coords})
      },
      (error) => {
        this.setState({showModal:true, modalType: true})
        // alert('error yendo a geolocalizacion'+error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

	render() {
		return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/vamos_logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
        <View style={styles.body}>
          <View style={styles.bodyItem}>
            <Icon name='ios-globe-outline' style={{fontSize: 24, color:'#e6334c'}}/>
            {/* <Text style={styles.bodyItemText}>{I18n.t("language", {locale: this.props.ui.lang})}</Text> */}
            <View style={{width: 100, paddingTop:3}}>
              <Picker
                selectedValue={this.state.language}
                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue}, ()=>{this.props.dispatch(setLang(itemValue))})}>
                <Picker.Item label="ES" value={ES} color="#e6334c"/>
                <Picker.Item label="EN" value={EN} color="#e6334c"/>
              </Picker>
            </View>
          </View>
          <TouchableHighlight
            onPress={this._goToAbout}
            activeOpacity={0.5}
            underlayColor="white"
            >
            <View
              style={styles.bodyItem}
              >
              <Icon name='ios-information-circle' style={{fontSize: 24, color:'#e6334c'}}/>
              <Text style={styles.bodyItemText}>{I18n.t("goToAbout", {locale: this.props.ui.lang})}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this._goToSuggest}
            activeOpacity={0.5}
            underlayColor="white"
            >
            <View
              style={styles.bodyItem}
              >
              <Icon name='ios-add-circle' style={{fontSize: 24, color:'#e6334c'}}/>
              <Text style={styles.bodyItemText}>{I18n.t("goToSuggest", {locale: this.props.ui.lang})}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this._goToNearby}
            activeOpacity={0.5}
            underlayColor="white"
            >
            <View
              style={styles.bodyItem}
              >
              <Icon name='ios-pin' style={{fontSize: 24, color:'#e6334c'}}/>
              <Text style={styles.bodyItemText}>{I18n.t("nearby", {locale: this.props.ui.lang})}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this._reloadBD}
            activeOpacity={0.5}
            underlayColor="white"
            >
            <View
              style={styles.bodyItem}
              >
              <Icon name='md-refresh' style={{fontSize: 24, color:'#e6334c'}}/>
              <Text style={styles.bodyItemText}>{I18n.t("refetch", {locale: this.props.ui.lang})}</Text>
            </View>
          </TouchableHighlight>
          {/* <Text>{`cantidad de establecimientos ${Object.keys(this.props.db.places.data).length}`}</Text> */}
        </View>
        <View style={styles.footer}>
          <View style={styles.footerImage}>
            <Image
              source={require('../../../assets/images/ippf_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.footerImage}>
            <Image
              source={require('../../../assets/images/huesped_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {console.log("Modal has been closed.")}}
          >
         <View style={styles.modalContainer}>
            {this.state.modalType ? (
              <View style={styles.modalView}>
                <View style={styles.modalViewTitle}>
                  <Text style={{fontWeight:'bold',fontSize:16}}>GPS</Text>
                </View>
                <View style={styles.modalViewDescriptionGPS}>
                  <View style={styles.modalViewDescriptionIcon}>
                    <Icon name="md-warning" style={{fontSize: 50, color: '#e6334c'}}/>
                  </View>
                    <Text style={{flex: 1, color:'#5d5d5d', fontSize: 16}}>Para acceder a la busqueda por geolocalización debes activar tu gps</Text>
                </View>
                <View style={styles.modalViewActions}>
                  <View>
                    <Button
                      onPress={() => this.setState({showModal:false})}
                      color="#e6334c"
                      title="Volver"
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.modalView}>
                <View style={styles.modalViewTitle}>
                  <Text style={{fontWeight:'bold',fontSize:16}}>Sincronizar Datos Mas Recientes</Text>
                </View>
                <View style={styles.modalViewDescription}>
                  <Text style={{fontSize:12, color: '#7f7f7f'}}>{`Ultima Sincronización: ${this._getDate()}` }</Text>
                  <Text>Estas seguro que quieres descargar nuevamentes la Base Datos? Esto podria llevar un momento, te aconsejamos conectarte a una red WIFI</Text>
                </View>
                <View style={styles.modalViewActions}>
                  <View style={{marginRight:'5%'}}>
                    <Button
                      onPress={this._refetch}
                      color="#e6334c"
                      title="Aceptar"
                    />
                  </View>
                  <View>
                    <Button
                      onPress={() => this._setModalVisible(false,false)}
                      color="#e6334c"
                      title="Cancelar"
                    />
                  </View>
                </View>
              </View>
            )}
         </View>
        </Modal>
      </View>
		);
	}
}

export default connect(mapStateToProps)(SideBar)

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'space-between',
  },
  header:{
    height: 100,
  },
  body:{
    marginLeft: 20
  },
  bodyItem:{
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  bodyItemText:{
    fontSize: 20,
    color:'#e6334c',
    marginLeft: 20,
    fontFamily: 'OpenSans'
  },
  footer:{
    justifyContent: 'center'
  },
  footerImage:{
    height: 50,
    marginBottom: 20
  },
  logo:{
    flex:1,
    width: '100%',
    height: '100%'
  },
  button:{
  },
  modalContainer:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    paddingHorizontal: '5%'
  },
  modalView:{
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: '2.5%'
  },
  modalViewTitle:{
    alignItems: 'center'
  },
  modalViewDescription:{
    marginVertical: '5%'
  },
  modalViewDescriptionGPS:{
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
    flexDirection: 'row',
    justifyContent: 'center',
  }
})
