import axios from 'axios';

export default axios.create({
  // Add /api to the end of the URL to match your server.js
  baseURL: 'http://localhost:3000/api'
});