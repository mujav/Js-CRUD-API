const router = require('express').Router(),
PostController = require('../controllers/post')

router.get('/', PostController.index)
router.get('/:pid', PostController.show)
router.put('/:pid/update', PostController.update)
router.delete('/:pid/delete', PostController.delete)
router.post('/create', PostController.create)

module.exports = router