/**
* AppController
*
* @description :: Server-side logic for managing apps
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

  layoutName: 'layouts/app',

  index: function (req, res) {
    if (req.session.user) {
      res.view('app/map', { layout: this.layoutName });
    } else {
      res.view('app/auth', { layout: this.layoutName });
    }
  },

  auth: function (req, res) {
    User.authenticate(req.param('email'), req.param('password'), function (err, user) {
      if (err) {
        req.flash('message', 'Login incorreto!');
        return res.redirect('/app');
      }
      
      req.session.user = user;
      return res.redirect('/app');
    });
  },
  
  parkings: function (req, res) {
    Park.find({})
      .then(function (parks) {
        res.json(parks);
      })
      .catch(function (err) {
        res.status(500);
      });
  },
  
  parkingmeters: function (req, res) {
    // TODO
  }
  
};
