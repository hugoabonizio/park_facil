module.exports = function(req, res, next) {
	if (req.method === 'POST') {
		return next();
	}
	return res.badRequest();
};
