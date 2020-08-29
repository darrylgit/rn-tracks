import axios from 'axios';

// ngrok http 3000
export default axios.create({
  baseURL: 'http://86eea392253c.ngrok.io'
});
