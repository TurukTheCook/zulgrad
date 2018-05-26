import axios from 'axios'
import app from './../main'
import router from '../router';

// Intercepteur de requetes HTTP, pour chaque requete http on defini un header
// qui se nomme 'Authorization' et qui contient le token (depuis le localstorage)
// Le token est donc envoyé pour chacune des requete vers le back-end.
// Vue.http.interceptors.push(function(request) {
//   request.headers.set('Authorization', localStorage.getItem('token'));
// });
// axios.defaults.baseURL = 'http://localhost:1407';
// axios.interceptors.request.use((config) => {
//     config.headers.Authorization = localStorage.getItem('token');
//     return config;
// });

let http = axios.create({
	baseURL: 'http://localhost:1407/api/'
})

http.interceptors.request.use(
	config => {
		app.$Progress.start() // for every request start the progress
		config.headers.Authorization = localStorage.getItem('token')
		return config
	},
	error => {
		app.$Progress.fail()
		return Promise.reject(error)
})

http.interceptors.response.use(
	response => {
		app.$Progress.finish() // finish when a response is received
		return response
	},
	error => {
		app.$Progress.fail()
		if (error.response.status == 403) {
			router.push({ name: 'login' })
		}
		return Promise.reject(error)
})

export default http