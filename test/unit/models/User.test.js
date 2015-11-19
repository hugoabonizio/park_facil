var assert = require('assert');

describe('User', function() {

  describe('#authenticate()', function() {
    it('should authenticate successfully', function (done) {
      User.authenticate('user@email.com', 'senha', function (err, user) {
        assert.equal(null, err);
        assert.equal('Hugo', user.name);
        done();
      });
    });
    
    it('should fail authentication', function (done) {
      User.authenticate('hugo@email.com', 'senha', function (err, user) {
        assert(err != null);
        done();
      });
    });
  });

});