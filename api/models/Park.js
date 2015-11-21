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
    lots : { type: 'integer', required: true },
    latitude : { type: 'string', required: true },
    longitude : { type: 'string', required: true },
    price: {type: 'float'},
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
        longitude: this.longitude
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
