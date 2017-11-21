const router = require('express').Router();
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
// ===================================================================
router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);
// ====================================================================
router.route('/register')
  .post(auth.register);
router.route('/login')
  .post(auth.login);
// ======================================================================
router.all('/*', (req, res) => res.notFound());
// =======================================================================


module.exports = router;
