import axios from 'axios';

// ngrok http 3000
export default axios.create({
  baseURL: 'http://3feeb0633137.ngrok.io'
});
