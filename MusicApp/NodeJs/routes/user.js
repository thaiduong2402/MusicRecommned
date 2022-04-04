const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
//router.get('/:id', UserController.userID)
router.get('/allsong', UserController.allSong)
router.get('/nghenhieu', UserController.ngheNhieu)
router.get('/userget/:id', UserController.UserGet)
router.post('/userpost', UserController.UserPost)



module.exports = router;