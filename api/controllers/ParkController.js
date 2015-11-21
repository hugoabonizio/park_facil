/**
* ParkController
*
* @description :: Server-side logic for managing parks
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

	layoutName : 'layouts/dashboard',

	index: function (req, res) {
    if (req.session.park) {
      res.view('park/parking', { layout: this.layoutName });
    } else {
      res.view('park/auth');
    }
  },

	editar: function(req, res){
		res.view({layout: this.layoutName});
	},

	editarSenha: function(req, res){
		res.view({layout: this.layoutName});
	},

	preco: function(req, res){
		res.view({layout: this.layoutName});
	},

	tickets: function(req, res){
		var _this = this;
		Ticket.find({
			park: req.session.park.id
		}).exec(function findCB(err, found){
			return res.view({layout: _this.layoutName, tickets: found});
		});
	},

	gerarTicket: function(req, res){
		res.view({layout: this.layoutName});
	},

	salvarTicket: function(req, res){
		Ticket.create({
			licensePlate: req.param('placa'),
			tel: req.param('telefone'),
			vehicleType: req.param('tipoVeiculo'),
			park: req.session.park.id
		}, function ticketCreated(err, newUser) {
			if (err) {
			  return res.negotiate(err);
			}
			//TODO - mensagens flash
			// Flash.success('Ticket criado com sucesso');
			return res.redirect('/park/index');
		});
	},

	salvarEdit: function(req, res){
		Park.update(
			{
				id: req.session.park.id
			}, {
			shops: req.param('convenios'),
			offer: req.param('promocoes')
			}
		).exec(function parkEdited(err, updatedPark) {
			if (err) {
			  return res.negotiate(err);
			}
			//Atualiza as informações do estacionamento da sessão
			req.session.park.offer = updatedPark[0].offer;
			req.session.park.shops = updatedPark[0].shops;
			//TODO - mensagens flash
			// Flash.success('Ticket criado com sucesso');
			return res.redirect('/park/index');
		});
	},

	salvarSenha: function(req, res){
		// require('machinepack-passwords').encryptPassword({
    //   password: req.param('password'),
    //   difficulty: 10,
    // }).exec({
    //   error: function(err) {
    //     return res.negotiate(err);
    //   },
    //   success: function(encryptedPassword) {
				Park.update(
					{
						id: req.session.park.id
					}, {
						password: req.param('password'),
						// password: encryptedPassword,
					}
				).exec(function passwordSaved(err, updatedPark) {
					if (err) {
					  return res.negotiate(err);
					}
					//TODO - mensagens flash
					// Flash.success('Senha alterada com sucesso. Por favor login novamente.');
					//TODO - fazer logout geral que tira qualquer login
					return res.redirect('park/logout');
				});
    //   }
    // });
	},

  auth: function (req, res) {
    // require('machinepack-passwords').encryptPassword({
    //   password: req.param('password'),
    //   difficulty: 10,
    // }).exec({
    //   error: function(err) {
    //     return res.negotiate(err);
    //   },
    //   success: function(encryptedPassword) {
        Park.findOne({
          email: req.param('email'),
          password: req.param('password')
					// password: encryptedPassword
        }, function foundUser(err, park) {
					if (err || !park) return res.send('fodeu');

					req.session.park = _.clone(park);
					res.redirect('/park');
        })
    //   }
    // });
  },

	/**
	* `ParkController.parking()`
	*/
	logout: function (req, res) {
		req.session.park = null;
		return res.redirect('/park/index');
	}
};
