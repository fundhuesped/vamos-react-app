import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Card, Form, Item, Input, Label } from 'native-base';
import {View, StyleSheet, FlatList, Text, Keyboard} from 'react-native'
import { StyleProvider } from 'native-base';
import getTheme from '../../config/styles/native-base-theme/components';
import platform from '../../config/styles/native-base-theme/variables/platform';
import CitiesList from '../../components/Dummy/CitiesList/component.js'

import {connect} from 'react-redux'

function mapStateToProps(store) {
    return {db: store.db}
}

class BuscarCiudad extends React.Component {

  constructor(){
    super();
    this.state= {
      showList: false,
      currentSearch: "",
      filterEstablishments: [{establecimiento:'Cargando...', placeId:0}],
    }
  }



  _fetch = async () => {
    try {
      let response = await fetch('https://ippf-staging.com.ar/api/v2/places/getall', {
                            method: 'GET',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                            }})
      let responseJson = await response.json();
      this.setState({establishments:responseJson.data})
    } catch(error) {
      console.error(error);
      // alert(`error: ${error}`)
    }
  }


  _filterList = () =>{
    console.log('filtrando');
    let places = this.props.db.places
    let filterEstablishments = Object.values(places).filter((place) => {
        console.log(place);
        console.log(place.establecimiento.includes(this.state.currentSearch));
        if(place.establecimiento.includes(this.state.currentSearch)) return places;
      }, {});


    if(filterEstablishments.length === 0) filterEstablishments.push({establecimiento:'No se encontraron establecimientos', placeId:0})
    this.setState({filterEstablishments})
    console.log(filterEstablishments);
  }

  _renderListResults = () =>{
    console.log(this.state.currentSearch);
    console.log(this.state.currentSearch.length);
    console.log(this.state.showList);
    return (this.state.currentSearch !== "" && this.state.currentSearch.length >= 1 && this.state.showList) ? (
      <View style={styles.flatlistContainer}>
        <CitiesList data={this.state.filterEstablishments} />
      </View>
    ):(
      null
    )
  }

  _isInputFocus = (isFocus) => this.setState({showList:isFocus})

  render() {
    console.log(this.props);
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:"#FFFFFF"}}>
          <Header>
            <Left>
              <Button
                transparent
                onPress={()=>{this.props.navigation.goBack()}}
                >
                <Icon name="ios-arrow-back"/>
              </Button>
            </Left>
            <Body>
              <Title>Buscar Ciudad</Title>
            </Body>
          <Right/>
          </Header>
          <Content
            contentContainerStyle ={{
              paddingTop: '5%',
              paddingRight: '5%',
              paddingLeft: '5%',
              flex:1,
              }}
          >
            <View style={styles.container}>
              <View style={styles.containerHeader}>
                <Text style={{color:'#e6334c'}}>Buscar Condones</Text>
              </View>
              <View style={styles.cardContainer}>
              <Card style={{flex:1}}>
                <View style={styles.card}>
                  <Text>Escribe el nombre del Departamento o Partido</Text>
                  <View>
                      <Item floatingLabel>
                        <Icon name="md-pin" style={{fontSize:12}}/>
                        <Label style={{fontSize:14}}>Ejemplo: La Boca o Lavalle</Label>
                        <Input
                          multiline={true}
                          onChangeText={(text) => this.setState({currentSearch:text}, this._filterList)}
                          value={this.state.currentSearch}
                          onFocus={() => this._isInputFocus(true)}
                          // onBlur={() => this._isInputFocus(false)}
                        />
                      </Item>
                  </View>
                  {this._renderListResults()}
                  <Button
                    block
                    disabled
                    style={{justifyContent:'space-between'}}
                    onPress={()=>{console.log('BUSCAR');}}
                    >
                    <Icon name='ios-list'/>
                    <Text>BUSCAR</Text>
                    <Icon name='ios-arrow-forward'/>
                  </Button>
                </View>
              </Card>
            </View>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default connect(mapStateToProps)(BuscarCiudad)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // backgroundColor: 'red'
  },
  containerHeader:{
    alignItems:'center'
  },
  cardContainer:{
    flex: 1
  },
  card:{
    // flex:1,
    padding: '3%',
    justifyContent: 'space-between'
  },
  flatlistContainer:{
    position: "absolute",
    paddingVertical: 20,
    top: 90,
    width: '80%',
    marginLeft:'2.5%',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    zIndex: 10,
    height: '300%'
  },

})
