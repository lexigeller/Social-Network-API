const router = require('express').Router();
const userRoutes = require('./user-routes'); // Import user routes
const thoughtRoutes = require('./thought-routes'); // Import thought routes
const reactionRoutes = require('./reaction-routes'); // Import reaction routes

router.use('/users', userRoutes); // Use user routes under /api/users
router.use('/thoughts', thoughtRoutes); // Use thought routes under /api/thoughts
router.use('/reactions', reactionRoutes); // Use reaction routes under /api/reactions

module.exports = router;
