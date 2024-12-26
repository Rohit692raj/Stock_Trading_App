const { register } = require("../controllers/companyControllers");

const router = require("express").Router();

router.post("/register", register);

module.exports = router;
