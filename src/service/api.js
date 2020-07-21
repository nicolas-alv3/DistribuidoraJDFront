import axios from 'axios';

const server = 'http://localhost:8080';
const reportBody = {
  "template": { "name" : "invoicer" },
  "data" : { "to": "John Lennon", "from": "George Harrison", "price": 800 }
}

const API = {
  get: (path, body) => axios.get(`${server}${path}`, { params: body }).then((response) => response.data),
  put: (path, body) => axios.put(`${server}${path}`, body).then((response) => response.data),
  post: (path, body) => axios.post(`${server}${path}`, body, { crossdomain: true }).then((response) => response.data),
  delete: (path, body) => axios.delete(`${server}${path}`, body).then((response) => response.data),
  report: () => axios.post('localhost:5488/api/report', reportBody).then((response) => response.data),
};

export default API;
