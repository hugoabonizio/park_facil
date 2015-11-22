/**
* Park.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { type: 'string', required: true },
    email: { type: 'email', required: true },
    password: { type: 'string', required: true },
    //vagas
    freeLots: {type: 'integer', required: true},
    lots : { type: 'integer', required: true },
    latitude : { type: 'string', required: true },
    longitude : { type: 'string', required: true },
    startingTime: {type: 'int', required: true, defaultsTo: 15},
    startingPrice: {type: 'float', required: true, defaultsTo: 3.5},
    price: {type: 'float', required: true, defaultsTo: 0.07},
    //convenios
    shops: { type: 'string', size: 100 },
    //promocoes
    offer: { type: 'string', size: 100 },

    tickets:{
      collection: 'ticket',
      via: 'park'
    },

    toJSON: function () {
      return {
        id: this.id,
        name: this.name,
        lots: this.lots,
        latitude: this.latitude,
        longitude: this.longitude,
        offer: this.offer,
        shops: this.shops,
        startingTime: this.startingTime,
        startingPrice: this.startingPrice,
        price: this.price
      }
    }
  },

  beforeCreate: function (values, cb) {

    require('machinepack-passwords').encryptPassword({
      password: values.password,
      difficulty: 10,
    }).exec({
      error: function(err) {
        return cb(err);
      },
      success: function(encryptedPassword) {
        values.password = encryptedPassword;
        cb();
      }
    });
  },

  authenticate: function (email, password, callback) {
    Park.findOne({
      email: email
    }, function foundUser(err, user) {
      if (err || !user) return callback(err, null);

      require('machinepack-passwords').checkPassword({
        passwordAttempt: password,
        encryptedPassword: user.password
      }).exec({
        success: function () { callback(null, user) },
        error: function (err) { callback(err, null) },
        incorrect: function () { callback(err, null) }
      });
    });
  }

};
