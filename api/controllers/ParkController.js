/**
* ParkController
*
* @description :: Server-side logic for managing parks
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

	layoutName : 'layouts/dashboard',

	index: function (req, res) {
    // if (req.session.user) {
      res.view('park/parking', { layout: this.layoutName });
    // } else {
    //   res.view('park/auth', { layout: layoutName });
    // }
  },

	gerarTicket: function(req, res){
		res.view({layout: this.layoutName});
	},

	ticket: function(req, res){
		if(!req.session.park){
      return res.forbidden('Faça login novamente para submeter um novo ticket');
    }
		Ticket.create({
			placa: req.param('placa'),
			mensalista: Boolean(req.param('mensalista') || false),
			telefone: req.param('telefone'),
			park: req.session.park.id
		}, function ticketCreated(err, newUser) {
			if (err) {
				console.log(err);
			  // return res.negotiate(err);
				return res.notFound();
			}
			//TODO
			// Flash.success('Ticket criado com sucesso');
			return res.redirect('/park/index');
		});
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

					req.session.park = park;
					res.redirect('/park');
        })
    //   }
    // });
  },

	/**
	* `ParkController.parking()`
	*/
	parking: function (req, res) {
		return res.view();
	},


	/**
	* `ParkController.edit()`
	*/
	edit: function (req, res) {
		return res.json({
			todo: 'edit() is not implemented yet!'
		});
	},


	/**
	* `ParkController.update()`
	*/
	update: function (req, res) {
		return res.json({
			todo: 'update() is not implemented yet!'
		});
	}
};
