const CompanyModel = require("../models/companyModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const companyData = req.body;
    const salt = await bcrypt.genSalt(10);
    companyData.password = await bcrypt.hash(companyData.password, salt);
    const newCompany = new CompanyModel(companyData);
    await newCompany.save();
    res.status(200).json({
      message: "Company registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
