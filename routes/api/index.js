const router = require('express').Router();
const pizzaRoutes = require('./user-routes');
const commentRoutes = require('./thought-routes');

// add prefix of `/users` to routes created in `pizza-routes.js`
router.use('/thoughts', commentRoutes);
router.use('/users', pizzaRoutes);


module.exports = router;