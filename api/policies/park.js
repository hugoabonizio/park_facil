module.exports = function(req, res, next) {
	if (req.session.park) {
	   return next();
	}
	return res.forbidden('Faça login novamente para acessar esta página');
};
