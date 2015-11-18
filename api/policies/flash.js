module.exports = function(req, res, next) {
	res.locals.flash = {
		success: [],
		error: [],
		info: [],
		warning: []
	};
	if (!req.session.flash) {
		req.session.flash = {
			success: [],
			error: [],
			info: [],
			warning: []
		};
		return next();
	}
	res.locals.flash = _.clone(req.session.flash);

	// Clear flash
	req.session.flash = {
		success: [],
		error: [],
		info: [],
		warning: []
	};
	return next();
};
