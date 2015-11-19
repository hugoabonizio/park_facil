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
    lots : { type: 'integer', required: true },
    latitude : { type: 'string', required: true },
    longitude : { type: 'string', required: true },
    shops: { type: 'string', size: 100 },
    offer: { type: 'string', size: 100 },

    tickets:{
      collection: 'ticket',
      via: 'park'
    }

    // numero ticket, entrada (data), placa, convenio (bool), telefone

  },
  toJSON: function () {
    return {
      name: this.name,
      lots: this.lots,
      latitude: this.latitude,
      longitude: this.longitude
    }
  }


};
