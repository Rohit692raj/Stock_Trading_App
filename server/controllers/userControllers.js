const userModel = require("../models/userModel");
const { userRegister } = require("../services/userRegister");

module.exports.checkuserName = async (req, res, next) => {
    try {
        const { userName } = req.params;
        const user = await userModel.findOne({ userName });

        if (user) {
            return res.status(200).json({ exists: true });
        }

        return res.status(200).json({ exists: false });
    } catch (err) {
        console.log(err);
    }
};

module.exports.register = async (req, res, next) => {
    userRegister(req, res, next);
};

module.exports.login = async (req, res, next) => { };

module.exports.companyRegister = async (req, res, next) => { };
