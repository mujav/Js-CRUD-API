const router = require('express').Router(),
UserRoutes = require('./user'),
PostRoutes = require('./post')

router.use('/users', UserRoutes)
router.use('/posts', PostRoutes)

module.exports = router
