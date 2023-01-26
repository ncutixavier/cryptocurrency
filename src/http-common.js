import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-cors-resolver.onrender.com/api/v1/coinmarket',
  headers: {
    'Content-type': 'application/json',
  },
});
