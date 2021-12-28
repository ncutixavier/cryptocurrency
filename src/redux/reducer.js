const initialState = [];
  
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
  