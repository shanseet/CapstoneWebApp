import axios from 'axios';

export default {
	// Gets all practices
	getAllPracs: function () {
		return axios.get('http://localhost:4000/api/pracs');
	},
	// Gets one practice data
	getOnePrac: function (id) {
		return axios.get('http://localhost:4000/api/pracs/' + id);
	},
	// Adds a new practice
	addPrac: function (prac) {
		return axios.post('http://localhost:4000/api/pracs', { prac: prac });
	},
	// Gets the number of pracs so far
	getNum: function () {
		return axios.get('http://localhost:4000/api/pracs/counter');
	},
	// Check whether an active practice session is ongoing
	isActive: function () {
		return axios.get('http://localhost:4000/api/pracs/isactive');
	},
	// update an active practice session state
	setActive: function (startstop) {
		return axios.post('http://localhost:4000/api/pracs/isactive', { startstop: startstop });
	},
	deleteAllPracs: function () {
		return axios.post('http://localhost:4000/api/pracs/deleteAll');
	}
};