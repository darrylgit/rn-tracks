import axios from 'axios';

// ngrok http 3000
export default axios.create({
  baseURL: 'http://ecfd7e1188a1.ngrok.io'
});
