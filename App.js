import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ajax from './components/ajax'; // Import the fetchinitialDeals function
import DealList from './components/DealList'; // Import the DealList component
import DealDetail from './components/DealDetail'; // Import the DealDetail component

class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals(); // Use the imported fetchinitialDeals function
    this.setState(prevState => {
      return {deals};
    });
  }

  setCurrentDeal = dealId => {
    this.setState({
      currentDealId: dealId,
    });
  };

  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };
  render() {
    if (this.state.currentDealId) {
      return <DealDetail initialDealDate={this.currentDeal()} />;
    }
    if (this.state.deals.length > 0) {
      return (
        <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
  },
  header: {
    fontSize: 40,
  },
});

export default App;
