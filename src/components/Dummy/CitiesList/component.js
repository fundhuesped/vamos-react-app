import React from 'react';
import {FlatList} from 'react-native';
import CityItem from '../CityItem/component.js'


export default class CitiesList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      console.log('apretado');
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <CityItem
      id={item.placeId}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.establecimiento}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={{paddingLeft:'5%'}}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode='on-drag'
      />
    );
  }
}
