module.exports = function(req, res, next) {
	if (req.session.park) {
	   return next();
	}
	// Flash.danger('Faça login novamente para acessar esta página');
	return res.forbidden('Faça login novamente para acessar esta página');
};
