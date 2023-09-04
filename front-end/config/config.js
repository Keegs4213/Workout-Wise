//config/config.js
const dev = process.env.NODE_ENV !== 'production';

export const API_URL = dev ? 'http://localhost:8080' : 'https://pure-springs-99603-4cd96693a709.herokuapp.com';
