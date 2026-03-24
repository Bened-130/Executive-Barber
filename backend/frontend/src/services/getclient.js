import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;
// const CLIENTS_URL = 'http://127.0.0.1:5500/api/v1/clients'
export async function fetchClients(){
    try {
          const response  = await axios.get(`${BASE_URL}/api/v1/clients`)
          console.log(response.data.data.clients)
          return response.data.data.clients
    }
    catch(err){
        console.log('There was an error fetching data',err)
    }
}