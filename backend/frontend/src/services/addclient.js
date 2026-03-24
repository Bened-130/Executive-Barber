import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;

// const CLIENTS_URL = 'http://127.0.0.1:5500/api/v1/clients'
export async function createClient(clientData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/clients`, clientData);
    return response.data.data.client;
  } catch (err) {
    console.error('Error creating client', err);
    throw err;
  }
}