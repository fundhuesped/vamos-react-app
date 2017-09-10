import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon} from 'native-base';
import {View, Image, StyleSheet, Picker, Dimensions, Text, ScrollView, TextInput, TouchableHighlight} from 'react-native';
import { StyleProvider } from 'native-base';
import getTheme from '../../config/styles/native-base-theme/components';
import platform from '../../config/styles/native-base-theme/variables/platform';
import SVGVamosLogo from '../../components/Dummy/SVG/VamosLogo/component.js'
import I18n from '../../config/i18n/index.js';

import {
  CON,
  VIH,
  SSR,
  MAC,
  LPI,
  DC,
} from '../../constants/action-types';

const {width} = Dimensions.get('window');

export default class Evaluations extends React.Component {

  constructor(){
    super();
    this.state ={
      service:{
        id: '',
        shortname: '',
        name: ''
      },
      serviceType: '',
      vote: '',
      commentInput: '',
      gender: "",
      ageInput: '',
      nameInput: '',
      emailInput: '',
      phoneInput: '',
      checkAgeInput: true,
      checkserviceId:true,
      checkServiceType:true,
      checkVote:true,
      checkGender:true,
      sendButtonDisabled: false,
      showThanks: false
    }
  }

  _renderServices = () =>{
    let serviceOptions = [];
    this.props.servicesAvailable.map( (service,i) =>{
      serviceOptions.push(<Picker.Item label={service.content.name} value={`${service.content.id}/${service.content.shortname}`} color="#000" key={i}/>)
    })

    return serviceOptions
  }

  _sendForm = () =>{
    this.setState({sendButtonDisabled:true})
    if(!sendButtonDisabled) this._checkForm()
  }

  _checkForm = () =>{

    console.log(this.state.service.id);
    console.log(this.state.serviceType);
    console.log(this.state.vote);
    console.log(this.state.commentInput);
    console.log(this.state.gender);
    console.log(this.state.ageInput);
    console.log(this.state.nameInput);
    console.log(this.state.emailInput);
    console.log(this.state.phoneInput);
    if(this.state.service.id !== '' && this.state.serviceType !== '' && this.state.vote !== '' && this.state.gender !== '' && this.state.ageInput !== '') {

      let serviceSplit = this.state.service.id.split('/')

      try {
        fetch("https://ippf-staging.com.ar/api/v2/evaluacion/votar",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
              comments: this.state.commentInput,
              comodo: 0,
              edad: this.state.ageInput,
              email: this.state.emailInput,
              es_gratuito: 0,
              genero: this.state.gender,
              idPlace: this.props.establishmentId,
              info_ok: "",
              informacion_vacunas: "evaluation_answeroption_75",
              le_dieron: "",
              name: this.state.nameInput,
              privacidad_ok: "",
              que_busca: this.state.serviceType,
              service: serviceSplit[0],
              serviceShortName: serviceSplit[1],
              tel: this.state.phoneInput,
              voto: this.state.vote
            })
        })
        .then( (res) => {
          console.log(res)
          if(res.ok) this.setState({showThanks: true})
        })
        .catch( (error) => {
          console.log(error)
          this.setState({sendButtonDisabled:false})
        })
      } catch (e) {
        console.log(e);
        this.setState({sendButtonDisabled:false})
      }

    }
    else{
      this.refs.scrollRef.scrollTo({x: 0, y:0, animated: true})
        let checkserviceId = (this.state.service.id !== '') ? true : false,
            checkServiceType = (this.state.serviceType !== '') ? true : false,
            checkVote = (this.state.vote !== '') ? true : false,
            checkGender = (this.state.gender !== '') ? true : false,
            checkAgeInput = (this.state.ageInput !== '') ? true : false;


      this.setState({checkserviceId, checkServiceType, checkVote, checkGender, checkAgeInput, sendButtonDisabled:false })
    }
  }

  render() {
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
            <ScrollView
              style={{flex:1}}
              ref='scrollRef'
              >
                {(this.state.showThanks) ? (
                  <View style={styles.evaluationsContainer}>
                    <Text style={[styles.fontColor, {fontWeight:'bold',fontSize:16}]}>Muchas Gracias!</Text>
                    <Text style={styles.fontColor}>Tus respuestas ayudan a que todas las personas accedamos a mejores servicios.</Text>
                    <View style={{justifyContent:'center', alignItems:'center', paddingVertical:'5%'}}>
                      <TouchableHighlight
                        onPress={() =>{this.props.navigation.goBack()}}
                        activeOpacity={0.5}
                        underlayColor="white"
                        style={{borderColor: 'rgba(0, 0, 0, 0)', elevation: 2, borderRadius: 5, height: 45, paddingVertical:'1%', justifyContent:'center', alignItems:'center', paddingHorizontal:20}}
                        >
                          <Text style={{color: "#e6334c"}}>CERRAR</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                ) : (
                  <View style={styles.evaluationsContainer}>
                    <View style={styles.evaluationsHeader}>
                      <Text style={[styles.fontColor, {fontWeight:'bold',fontSize:16}]}>{I18n.t("rate_this_place", {locale: this.props.lang})}</Text>
                      <Text style={styles.fontColor}>{I18n.t("evaluation_required_label", {locale: this.props.lang})}</Text>
                    </View>
                    <View style={styles.section}>
                      <Text style={(this.state.checkserviceId) ? styles.fontColor : styles.fontColorInvalid}>Servicio*</Text>
                      <View style={(this.state.checkserviceId) ? styles.pickerContainer : styles.pickerContainerInvalid}>
                        <Picker
                          selectedValue={this.state.service.id}
                          onValueChange={(itemValue, itemIndex) => this.setState({service: { id: itemValue}})}>
                          <Picker.Item label="Selecciona un servicio" value="" color="rgba(0, 0, 0, 0.5)"/>
                          {this._renderServices()}
                        </Picker>
                      </View>
                    </View>
                    <View>
                      <Text style={(this.state.checkServiceType) ? styles.fontColor : styles.fontColorInvalid}>{I18n.t("evaluation_question_12", {locale: this.props.lang})}</Text>
                      <View style={(this.state.checkserviceId) ? styles.pickerContainer : styles.pickerContainerInvalid}>
                        <Picker
                          selectedValue={this.state.serviceType}
                          onValueChange={(itemValue, itemIndex) => this.setState({serviceType:itemValue})}>
                          <Picker.Item label="Selecciona un tipo de servicio" value="" color="rgba(0, 0, 0, 0.5)"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_59", {locale: this.props.lang})} value="evaluation_answeroption_59" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_60", {locale: this.props.lang})} value="evaluation_answeroption_60" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_61", {locale: this.props.lang})} value="evaluation_answeroption_61" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_62", {locale: this.props.lang})} value="evaluation_answeroption_62" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_63", {locale: this.props.lang})} value="evaluation_answeroption_63" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_64", {locale: this.props.lang})} value="evaluation_answeroption_64" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_65", {locale: this.props.lang})} value="evaluation_answeroption_65" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_66", {locale: this.props.lang})} value="evaluation_answeroption_66" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_67", {locale: this.props.lang})} value="evaluation_answeroption_67" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_68", {locale: this.props.lang})} value="evaluation_answeroption_68" color="#000"/>
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.section}>
                      <Text style={[(this.state.checkVote) ? styles.fontColor : styles.fontColorInvalid, {flexWrap:'wrap', flex:1}]}>{I18n.t("evaluation_question_13", {locale: this.props.lang})}</Text>
                      <View style={(this.state.checkserviceId) ? styles.pickerContainer : styles.pickerContainerInvalid}>
                        <Picker
                          selectedValue={this.state.vote}
                          onValueChange={(itemValue, itemIndex) => this.setState({vote: itemValue})}>
                          <Picker.Item label="Selecciona un valor" value="" color="rgba(0, 0, 0, 0.5)"/>
                          <Picker.Item label="0" value={0} color="#000"/>
                          <Picker.Item label="1" value={1} color="#000"/>
                          <Picker.Item label="2" value={2} color="#000"/>
                          <Picker.Item label="3" value={3} color="#000"/>
                          <Picker.Item label="4" value={4} color="#000"/>
                          <Picker.Item label="5" value={5} color="#000"/>
                          <Picker.Item label="6" value={6} color="#000"/>
                          <Picker.Item label="7" value={7} color="#000"/>
                          <Picker.Item label="8" value={8} color="#000"/>
                          <Picker.Item label="9" value={9} color="#000"/>
                          <Picker.Item label="10" value={10} color="#000"/>
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.section}>
                      <Text style={[styles.fontColor, {flexWrap:'wrap', flex:1}]}>{I18n.t("evaluation_question_15", {locale: this.props.lang})}</Text>
                      <TextInput
                        style={styles.commentInput}
                        onChangeText={(text) => this.setState({commentInput:text})}
                        value={this.state.commentInput}
                        placeholder="Máximo 200 caracteres"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        textAlignVertical={'top'}
                        multiline={true}
                        maxLength={200}
                      />
                    </View>
                    <View style={{flexDirection:'row', flex:1, alignItems: 'center', marginVertical: '2.5%', paddingRight:'1%'}}>
                      <Text style={(this.state.checkAgeInput) ? styles.fontColor : styles.fontColorInvalid}>{I18n.t("evaluation_question_4", {locale: this.props.lang})}</Text>
                      <TextInput
                        style={(this.state.checkAgeInput) ? styles.ageInput : styles.ageInputInvalid}
                        onChangeText={(text) => this.setState({ageInput:text})}
                        value={this.state.ageInput}
                        placeholder="###"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        keyboardType='numeric'
                        maxLength={3}
                      />
                    </View>
                    <View>
                      <Text style={[(this.state.checkGender) ? styles.fontColor : styles.fontColorInvalid, {flexWrap:'wrap', flex:1}]}>{I18n.t("evaluation_question_5", {locale: this.props.lang})}</Text>
                      <View style={(this.state.checkserviceId) ? styles.pickerContainer : styles.pickerContainerInvalid}>
                        <Picker
                          selectedValue={this.state.gender}
                          onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                          <Picker.Item label="Selecciona un genero" value="" color="rgba(0, 0, 0, 0.5)"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_9", {locale: this.props.lang})} value="evaluation_answeroption_9" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_10", {locale: this.props.lang})} value="evaluation_answeroption_10" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_38", {locale: this.props.lang})} value="evaluation_answeroption_38" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_39", {locale: this.props.lang})} value="evaluation_answeroption_39" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_40", {locale: this.props.lang})} value="evaluation_answeroption_40" color="#000"/>
                          <Picker.Item label={I18n.t("evaluation_answeroption_41", {locale: this.props.lang})} value="evaluation_answeroption_41" color="#000"/>
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.section}>
                      <Text style={[styles.fontColor, {flexWrap:'wrap', flex:1}]}>{I18n.t("evaluation_question_14", {locale: this.props.lang})}</Text>
                      <View style={{flexDirection:'row', flex:1, alignItems: 'center', marginVertical: '2.5%', paddingRight:'1%'}}>
                        <Text style={[styles.fontColor, {flex:1}]}>{I18n.t("name", {locale: this.props.lang})}</Text>
                        <TextInput
                          style={styles.nameInput}
                          onChangeText={(text) => this.setState({nameInput:text})}
                          value={this.state.nameInput}
                          placeholder={I18n.t("name", {locale: this.props.lang})}
                          underlineColorAndroid='rgba(0,0,0,0)'
                        />
                      </View>
                      <View style={{flexDirection:'row', flex:1, alignItems: 'center', marginVertical: '2.5%', paddingRight:'1%'}}>
                        <Text style={[styles.fontColor, {flex:1}]}>{I18n.t("email", {locale: this.props.lang})}</Text>
                        <TextInput
                          style={styles.nameInput}
                          onChangeText={(text) => this.setState({emailInput:text})}
                          value={this.state.emailInput}
                          placeholder="example@example.com"
                          underlineColorAndroid='rgba(0,0,0,0)'
                          keyboardType='email-address'
                        />
                      </View>
                      <View style={{flexDirection:'row', flex:1, alignItems: 'center', marginVertical: '2.5%', paddingRight:'1%'}}>
                        <Text style={[styles.fontColor, {flex:1}]}>{I18n.t("tel", {locale: this.props.lang})}</Text>
                        <TextInput
                          style={styles.nameInput}
                          onChangeText={(text) => this.setState({phoneInput:text})}
                          value={this.state.phoneInput}
                          placeholder="4444-4444"
                          underlineColorAndroid='rgba(0,0,0,0)'
                          keyboardType='phone-pad'
                        />
                      </View>
                    </View>
                    <View style={styles.evaluationsActionsContainer}>
                      <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor="white"
                        style={{borderColor: 'rgba(0, 0, 0, 0)', elevation: 2, flex:1, marginRight: '2.5%', justifyContent:'center', alignItems:'center', borderRadius: 5, height: 45, paddingVertical:'1%', paddingHorizontal:'2.5%'}}
                        onPress={this._checkForm}
                        >
                        <View style={{flexDirection: 'row', alignItems:'center', flex: 1, justifyContent:'space-between'}}>
                          <View style={{flex: 1, alignItems:'center'}}>
                            <Icon name='md-send' style={{fontSize: 25, color: '#e6334c'}}/>
                          </View>
                          <View style={{flex: 2}}>
                            <Text style={{color: "#e6334c", flexWrap:'wrap'}}>{I18n.t("evaluation_sendcalification_button_label", {locale: this.props.lang})}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                        onPress={() =>{this.props.navigation.goBack()}}
                        activeOpacity={0.5}
                        underlayColor="white"
                        style={{borderColor: 'rgba(0, 0, 0, 0)', elevation: 2, flex:1, justifyContent:'center', alignItems:'center', borderRadius: 5, height: 45, paddingVertical:'1%'}}
                        >
                          <Text style={{color: "#e6334c"}}>{I18n.t("cancel", {locale: this.props.lang})}</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                )}
            </ScrollView>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  fontColor:{ color: '#655E5E'},
  fontColorInvalid:{ color: '#e6334c'},
  evaluationsContainer:{
    flex:1,
    marginTop: '10%',
    width: width / 1.2,
  },
  section:{
    marginVertical: '5%'
  },
  pickerContainer:{
    marginTop: '2%',
    borderRadius: 5,
    backgroundColor:'#FFFFFF',
    borderColor:'grey',
    borderWidth: 1,
    height: 50,
  },
  pickerContainerInvalid:{
    marginTop: '2%',
    borderRadius: 5,
    backgroundColor:'#e6334c',
    height: 50,
  },
  commentInput:{
    padding: '2%',
    marginTop: '2%',
    borderWidth:1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 150
  },
  nameInput:{
    paddingLeft:'2%',
    paddingVertical:'1%',
    borderWidth:1,
    borderColor: 'gray',
    borderRadius: 5,
    marginLeft: '2.5%',
    flex:4
  },
  ageInput:{
    paddingLeft:'2%',
    paddingVertical:'1%',
    borderWidth:1,
    borderColor: 'gray',
    borderRadius: 5,
    marginLeft: '2.5%',
    marginRight:'auto',
    width: 40
  },
  ageInputInvalid:{
    paddingLeft:'2%',
    paddingVertical:'1%',
    borderWidth:1,
    borderColor: '#e6334c',
    borderRadius: 5,
    marginLeft: '2.5%',
    marginRight:'auto',
    width: 40
  },
  evaluationsActionsContainer:{
    flex: 1,
    marginTop: '2.5%',
    marginBottom: '3.5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})
