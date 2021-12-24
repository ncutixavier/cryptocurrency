const initialState = [
    {id: 1, name: "Bitcoin", symbol: "BTC", price : 9283.92,  total_supply : 17200062, market_cap : 17024600, circulating_supply : 17200062, volume_24h : 772012, last_updated: "2018-08-09T22:53:32.000Z", cmc_rank: 1,}
  ];
  
  export const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ASSET":
        state = [...state, action.payload];
        return state;

      case "UPDATE_ASSET":
        const assetUpdate = state.filter((asset) =>
          asset.id === action.payload.id
            ? Object.assign(asset, action.payload)
            : asset
        );
        state = assetUpdate;
        return state;

      default:
        return state;
    }
  };
  