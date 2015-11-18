module.exports = {
	success: function(req, message) {
		req.session.flash['success'].push(message);
	},
	warning: function(req, message) {
		req.session.flash['warning'].push(message);
	},
	error: function(req, message) {
		req.session.flash['error'].push(message);
	},
	info: function(req, message) {
		req.session.flash['info'].push(message);
	}
}
