/**
* ParkController
*
* @description :: Server-side logic for managing parks
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

	layoutName : 'layouts/dashboard',

	index: function (req, res) {
    // if (req.session.user) {
      res.view('park/parking', { layout: this.layoutName });
    // } else {
    //   res.view('park/auth', { layout: layoutName });
    // }
  },

  auth: function (req, res) {
    // require('machinepack-passwords').encryptPassword({
    //   password: req.param('password'),
    //   difficulty: 10,
    // }).exec({
    //   error: function(err) {
    //     return res.negotiate(err);
    //   },
    //   success: function(encryptedPassword) {
        Park.findOne({
          email: req.param('email'),
          password: req.param('password')
					// password: encryptedPassword
        }, function foundUser(err, user) {
					if (err || !user) return res.send('fodeu');

					req.session.user = user;
					res.redirect('/park');
        })
    //   }
    // });
  },

	/**
	* `ParkController.parking()`
	*/
	parking: function (req, res) {
		return res.view();
	},


	/**
	* `ParkController.edit()`
	*/
	edit: function (req, res) {
		return res.json({
			todo: 'edit() is not implemented yet!'
		});
	},


	/**
	* `ParkController.update()`
	*/
	update: function (req, res) {
		return res.json({
			todo: 'update() is not implemented yet!'
		});
	}
};
