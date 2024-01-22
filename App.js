import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ajax from './components/ajax'; // Import the fetchinitialDeals function
import DealList from './components/DealList'; // Import the DealList component

class App extends React.Component {
  state = {
    deals: [],
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals(); // Use the imported fetchinitialDeals function
    this.setState(prevState => {
      return {deals};
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.deals.length > 0 ? (
          <DealList deals={this.state.deals} />
        ) : (
          <Text style={styles.header}>Bakesale</Text>
        )}
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
