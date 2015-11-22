/**
* AppController
*
* @description :: Server-side logic for managing apps
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

  layoutName: 'layouts/app',

  versao1: function(req, res){
      // if (req.session.user) {
        res.view('app/map1', { layout: this.layoutName });
      // } else {
        // res.view('app/auth', { layout: this.layoutName });
      // }
  },

  index: function (req, res) {
    // if (req.session.user) {
      res.view('app/map', { layout: this.layoutName });
    // } else {
    //   res.view('app/auth', { layout: this.layoutName });
    // }
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
  
  parking: function (req, res) {
    Park.findOne({ id: req.param('id') })
      .then(function (park) {
        res.view('app/parking', { layout: null, park: park });
      })
      .catch(function (err) {
        res.status(500);
      });
  },
  
  parquimetros: function (req, res) {
    Parquimetro.find({})
      .then(function (parks) {
        res.json(parks);
      })
      .catch(function (err) {
        res.status(500);
      });
  },
  
  lots: function (req, res) {
    Lot.find({}).exec(function (err, lots) {
      if (err) res.serverError();

      lots.forEach(function (lot) {
        if (Math.random() > 0.8) {
          lot.status = !lot.status;
          lot.save();
        }
      });

      res.json(lots);
    });
  }

};
