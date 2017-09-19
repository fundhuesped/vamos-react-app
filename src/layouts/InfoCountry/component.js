import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon} from 'native-base';
import {View, Image, StyleSheet, Dimensions, Text, TouchableHighlight, ScrollView, Linking} from 'react-native';
import { StyleProvider } from 'native-base';
import getTheme from '../../config/styles/native-base-theme/components';
import platform from '../../config/styles/native-base-theme/variables/platform';
import SVGVamosLogo from '../../components/Dummy/SVG/VamosLogo/component.js'
import I18n from '../../config/i18n/index.js';

import {getGralTextandILEForCountry} from '../../utils/engines/index.js'

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


export default class InfoCountry extends React.Component {

  _goToSearch = () =>{
    if(this.props.cityDepartment !== undefined){
      this.props.navigation.navigate('SearchForGeolocation',{cityDepartment: this.props.cityDepartment})
    }
    else {
      this.props.navigation.navigate('SearchForGeolocation',{coords: this.props.coords, address:this.props.address})
    }
  }

  _renderButton = (ILEService) => {
    let button;
    if(this.props.service !== "LPI") button = (
      <Button
        bordered
        block
        style={{borderColor: 'rgba(0, 0, 0, 0)', elevation: 2, flex:1}}
        onPress={this._goToSearch}
        >
        <Text style={{color: "#e6334c", flexWrap:'wrap'}}>CONTINUAR CON LA BÚSQUEDA</Text>
      </Button>
    )
    else {
      if(ILEService) button = (
        <Button
          bordered
          block
          style={{borderColor: 'rgba(0, 0, 0, 0)', elevation: 2, flex:1}}
          onPress={this._goToSearch}
          >
          <Text style={{color: "#e6334c", flexWrap:'wrap'}}>CONTINUAR CON LA BÚSQUEDA</Text>
        </Button>
      )
      else button = (
        <Button
          bordered
          block
          style={{borderColor: 'rgba(0, 0, 0, 0)', elevation: 2, flex:1}}
          onPress={() => this.props.navigation.goBack()}
          >
          <Text style={{color: "#e6334c", flexWrap:'wrap'}}>REALIZAR OTRA BÚSQUEDA</Text>
        </Button>
      )
    }

    return button;
  }

  _handleLinks = (text) =>{
    let textComponent;
        textString = text.split('www')


    if(textString.length === 1){
      textComponent = (
        <Text>
          {textString[0]}
        </Text>
      )
    }else {
      textComponent = (
        <View>
          <Text>
            {textString[0]}
          </Text>
          <Text
            onPress={() => this._goURL(`https://www${textString[1]}`)}
            style={{color: "#e6334c"}}
            >
            {`www${textString[1]}`}
          </Text>
        </View>

      )
    }
    return textComponent
  }

  _goURL = (url) =>{
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    console.log(this.props);
    let gralTextandILEForCountry = getGralTextandILEForCountry(this.props.country)
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
            <ScrollView
              style={{width: '100%'}}
              contentContainerStyle ={{alignItems: 'center'}}
              >
              <View style={styles.container}>
                <View style={styles.infoCountryHeader}>
                  <Text style={{fontSize: 20}}>{I18n.t(this.props.country, {locale: this.props.lang})}</Text>
                  <Image
                    source={gralTextandILEForCountry.asocciationImageUrl}
                    style={styles.associationLogo}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.infoCountryBody}>
                  {this._handleLinks(gralTextandILEForCountry.generalText)}
                  {(this.props.service === "LPI") ? (
                    <View>
                      <View style={{height: 20}}/>
                      {this._handleLinks(gralTextandILEForCountry.ILEText)}
                    </View>
                  ) : (null)}
                </View>
                <View style={styles.infoCountryFooter}>
                  {this._renderButton(gralTextandILEForCountry.ILEService)}
                </View>
              </View>
            </ScrollView>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  fontColor:{ color: '#655E5E'},
  container:{
    marginTop: '10%',
    width: width / 1.2,
  },
  infoCountryHeader:{
    alignItems: 'center',
  },
  associationLogo:{
    width: '100%',
    height: width/ 3
  },
  infoCountryBody:{
    marginVertical: '5%'
  },
  infoCountryFooter:{
    paddingBottom: 10
  }
})
