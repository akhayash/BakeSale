import React from 'react';
import ProtoTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import {priceDisplay} from './util';
import ajax from './ajax';

class DealDetail extends React.Component {
  imageXpos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXpos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      const width = Dimensions.get('window').width;
      if (Math.abs(gs.dx) > width * 0.4) {
        const direction = Math.sign(gs.dx);
        // -1 for left, 1 for right
        Animated.timing(this.imageXpos, {
          toValue: direction * width,
          duration: 250,
        }).start(this.props.onBack);
      }
    },
  });
  static propTypes = {
    initialDealDate: ProtoTypes.object.isRequired,
    onBack: ProtoTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealDate,
    imageIndex: 0,
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
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{uri: deal.media[this.state.imageIndex]}}
          style={[{left: this.imageXpos}, styles.image]}
        />
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
  backlink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
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
