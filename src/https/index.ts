import axios from 'axios';

export const Https = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json',
    }
})

Https.interceptors.request.use((confing) => {

    const token = sessionStorage.getItem('token');

    if (token && confing?.headers) confing.headers = { 'Authorization': `Bearer ${token}` }
    
    return confing;
});

Https.interceptors.response.use((data) => { return data }, (err) => {
    if (err?.response?.data?.message) throw new Error(`[ERRO]: ${err.response.data.message}`);
    else throw new Error(`[ERRO]: Erro desconhecido! Por favor, entre em contato com o administrador do site.`);
});