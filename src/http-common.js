import axios from 'axios';

export default axios.create({
  baseURL: 'https://leave-app-sys.herokuapp.com/api/v1/coinmarket',
  headers: {
    'Content-type': 'application/json',
  },
});
