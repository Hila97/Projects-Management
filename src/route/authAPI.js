const router=require('express').Router()
const auth=require('../controllers/auth')

router.post('/change-password',(auth.changePass))
router.post('/login',(auth.login))
router.post('/register',auth.register)

module.exports=router