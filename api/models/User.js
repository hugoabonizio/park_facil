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
  }
};

