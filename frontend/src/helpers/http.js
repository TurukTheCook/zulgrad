import axios from 'axios'
import app from './../main'
import router from '../router';

let http = axios.create({
	baseURL: process.env.API_ADDRESS
})

http.interceptors.request.use(
	config => {
		app.$Progress.start() // for every request start the progress
		config.headers.Authorization = localStorage.getItem('X-Token')
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