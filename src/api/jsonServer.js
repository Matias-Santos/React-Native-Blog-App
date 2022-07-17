import axios from 'axios'

export default axios.create({
    // change this URL every 2 hs
    baseURL: 'https://feed-152-170-21-228.sa.ngrok.io'
})