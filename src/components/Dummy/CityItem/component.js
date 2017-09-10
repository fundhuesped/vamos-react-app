import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View, Image } from 'react-native';
import { Icon } from 'native-base';

export default class CityItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <Text
        onPress={this._onPress}
      >
        {this.props.title}
      </Text>
      // <SomeOtherWidget
      //   {...this.props}
      //   onPress={this._onPress}
      // />
    )
  }

}
