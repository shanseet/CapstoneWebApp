import axios from 'axios';

const apis = {
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
	editNotes: function (id, content) {
		return axios.post('http://localhost:4000/api/pracs/editNotes/' + id, { content: content })
	}
	,
	// Check whether an active practice session is ongoing
	isActive: function () {
		return axios.get('http://localhost:4000/api/pracs/isactive');
	},
	// update an active practice session state
	setActive: function (startstop) {
		return axios.post('http://localhost:4000/api/pracs/isactive', { startstop: startstop });
	},
	deleteOnePrac: function (id) {
		return axios.post('http://localhost:4000/api/pracs/delete/' + id);
	},
	deleteAllPracs: function () {
		return axios.post('http://localhost:4000/api/pracs/deleteAll');
	},
	findInRange: function (start, end) {
		return axios.post('http://localhost:4000/api/pracs/findInRange', { start: start, end: end });
	}
};

export default apis;