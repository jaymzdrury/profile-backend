const { Router } = require('express')
const controllers = require('../controllers/controllers')
const {Schemas, Validate} = require('../middleware/joi')
const router = Router()

router.get('/', controllers.get)
router.post('/', Validate(Schemas.data.create), controllers.post)
router.put('/:id', Validate(Schemas.data.update), controllers.put)
router.delete('/:id', controllers.remove)
router.post('/signup', controllers.signedUp)
router.post('/login', controllers.login)

module.exports = router