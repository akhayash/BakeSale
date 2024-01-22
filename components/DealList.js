import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class DealList extends React.Component {
  static propTypes = {
    deals: PropTypes.array.isRequired,
  };

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    flex: 1,
    width: '100%',
    paddingTop: 50,
  },
});
export default DealList;