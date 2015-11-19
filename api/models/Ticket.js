/**
* Ticket.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    entrada: {
      type: 'datetime',
      required: true,
      defaultsTo: function (){
        return new Date();
      }
    },
    placa: {
      type: 'string',
      required: true
    },
    convenio: {
      type: 'boolean',
      required: true
    },
    telefone : {
      type: 'string'
    },
    park:{
        model:'park'
    }

    // numero ticket, entrada (data), placa, convenio (bool), telefone
  }
};
