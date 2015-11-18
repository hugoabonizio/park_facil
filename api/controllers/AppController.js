/**
* AppController
*
* @description :: Server-side logic for managing apps
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

  layoutName: 'layout_app',

  index: function (req, res) {
    if (req.session.user) {
      res.view('app/map', { layout: layoutName });
    } else {
      res.view('app/auth', { layout: layoutName });
    }
  },

  auth: function (req, res) {
    require('machinepack-passwords').encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      error: function(err) {
        return res.negotiate(err);
      },
      success: function(encryptedPassword) {
        User.findOne({
          email: req.param('email'),
          password: encryptedPassword
        }, function foundUser(err, user) {
          if (err || !user) return res.send('fodeu');
          //ACHOU USUARIO
          req.session.user = user;
          res.redirect('/app');
        })
      }
    });
  }
};
