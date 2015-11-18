/**
 * ParkController
 *
 * @description :: Server-side logic for managing parks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

  /**
   * `ParkController.parking()`
   */
  parking: function (req, res) {
    return res.view();
  },

  /**
   * `ParkController.auth()`
   */
  authenticate: function (req, res) {
    Park.findOne({ email: req.param('email'), password: req.param('password') }, function (err, user) {
      if (err || !user) return res.send('fodeu');
    
      req.session.user = user;
      res.redirect('/parking');
    });
    
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

