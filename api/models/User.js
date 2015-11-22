/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { type: 'text', required: true },

    email : { type: 'email', required: true },

    password : { type: 'text', required: true }
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
    User.findOne({
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
