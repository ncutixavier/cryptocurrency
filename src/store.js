import { configureStore } from '@reduxjs/toolkit';
import cryptosReducer from './slices/CryptosSlice';

const reducer = {
  allCryptos: cryptosReducer,
};

export default configureStore({
  reducer: reducer,
  devTools: true,
});
