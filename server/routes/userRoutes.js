const { register, login, companyRegister, checkuserName } = require('../controllers/userControllers')

const router = require('express').Router()

router.get("/check-userName/:userName",checkuserName)
router.post("/register",register)
router.post("/login",login)
router.post("/companyRegister",companyRegister)

module.exports = router;