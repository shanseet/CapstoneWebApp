import axios from 'axios';

// sample

export default {
	// Gets all practices
	getAllPracs: function() {
		return axios.get('http://localhost:4000/api/pracs');
	},
	// Gets one practice data
	getOnePrac: function(id) {
		return axios.get('http://localhost:4000/api/pracs/' + id);
	},
	// Adds a new practice
	addPrac: function() {
		return axios.post('http://localhost:4000/api/books');
	},
	// Gets the number of pracs so far
	getNum: function() {
		return axios.get('http://localhost:4000/api/pracs/counter');
	}
};