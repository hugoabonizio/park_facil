/**
* Ticket.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    entranceDate: {
      type: 'datetime',
      required: true,
      defaultsTo: function (){
        return new Date();
      }
    },
    licensePlate: {
      type: 'string',
      required: true
    },
    vehicleType: {
      type: 'string',
      required: true
    },
    tel : {
      type: 'string'
    },
    park:{
      model:'park'
    }

    // numero ticket, entrada (data), placa, convenio (bool), telefone
  }
};
