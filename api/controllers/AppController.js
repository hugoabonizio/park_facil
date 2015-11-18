/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    if (req.session.user) {
      res.view('app/map', { layout: 'layout_app' });
    } else {
      res.view('app/auth', { layout: 'layout_app' });
    }
  },
  
  auth: function (req, res) {
    User.findOne({ email: req.param('email'), password: req.param('password') }, function (err, user) {
      if (err || !user) return res.send('fodeu');
    
      req.session.user = user;
      res.redirect('/app');
    });
  }
};

