// const apiHost = 'https://bakesaleforgood.com';
const apiHost = 'http://192.168.10.14:3000';

export default {
  async fetchInitialDeals() {
    // console.log('fetchInitialDeals called');
    try {
      const response = await fetch(apiHost + '/api/deals');
      // console.log('response: ', response);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDealDetail(dealId) {
    try {
      const response = await fetch(apiHost + '/api/deals/' + dealId);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
