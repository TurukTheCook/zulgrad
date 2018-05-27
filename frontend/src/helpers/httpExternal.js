import axios from 'axios'
import app from './../main'
import router from '../router';

let httpExternal = axios.create()

httpExternal.interceptors.request.use(
	config => {
		app.$Progress.start() // for every request start the progress
		return config
	},
	error => {
		app.$Progress.fail()
		return Promise.reject(error)
})

httpExternal.interceptors.response.use(
	response => {
		app.$Progress.finish() // finish when a response is received
		return response
	},
	error => {
		app.$Progress.fail()
		return Promise.reject(error)
})

export default httpExternal