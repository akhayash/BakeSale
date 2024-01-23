import React from 'react';
import ProtoTypes from 'prop-types';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {priceDisplay} from './util';
import ajax from './ajax';

class DealDetail extends React.Component {
  static propTypes = {
    initialDealDate: ProtoTypes.object.isRequired,
    onBack: ProtoTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealDate,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.props.initialDealDate.key);
    console.log(fullDeal);
    this.setState({deal: fullDeal});
  }

  render() {
    const {deal} = this.state;
    return (
      <View style={styles.detail}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backlink}>Back</Text>
        </TouchableOpacity>
        <Image source={{uri: deal.media[0]}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
          </View>
        </View>
        {deal.user && (
          <View>
            <Image source={{uri: deal.user.avatar}} style={styles.avatar} />
            <Text>{deal.user.name}</Text>
          </View>
        )}
        <View>
          <Text style={styles.description}>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
  },
  backlink: {
    marginBottom: 5,
    color: '#22f',
  },
  image: {
    width: '100%',
    height: 150,
  },
  detail: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    margin: 10,
    padding: 10,
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    boarderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});

export default DealDetail;
