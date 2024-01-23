import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ajax from './components/ajax'; // Import the fetchinitialDeals function
import DealList from './components/DealList'; // Import the DealList component
import DealDetail from './components/DealDetail'; // Import the DealDetail component
import SearchBar from './components/SearchBar';

class App extends React.Component {
  state = {
    deals: [],
    dealsFormSearch: [],
    currentDealId: null,
    activeSearchTerm: '',
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals(); // Use the imported fetchinitialDeals function
    this.setState(prevState => {
      return {deals};
    });
  }

  searchDeals = async searchTerm => {
    let dealsFormSearch = [];
    if (searchTerm) {
      dealsFormSearch = await ajax.fetchDealsSearchResult(searchTerm);
    }
    this.setState({dealsFormSearch, activeSearchTerm: searchTerm});
  };

  setCurrentDeal = dealId => {
    this.setState({
      currentDealId: dealId,
    });
  };

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    });
  };

  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };
  render() {
    if (this.state.currentDealId) {
      return (
        <DealDetail
          initialDealDate={this.currentDeal()}
          onBack={this.unsetCurrentDeal}
        />
      );
    }

    const dealsToDisplay =
      this.state.dealsFormSearch.length > 0
        ? this.state.dealsFormSearch
        : this.state.deals;

    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar
            searchDeals={this.searchDeals}
            initialSearchTerm={this.state.activeSearchTerm}
          />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
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
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
});

export default App;
