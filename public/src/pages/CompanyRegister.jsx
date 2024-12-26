import React from "react";
import { useState } from "react";
import instance from "../constants/axios";
import { toast } from "react-hot-toast";
import { companyRegisterSchema } from "../utils/companyValidation";
import set from "lodash/set";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function CompanyRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    contactEmail: "",
    contactPhone: "",
    password: "",
    repassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      companyRegisterSchema.parse(formData);
      const { street, city, state, postalCode, country, ...otherFields } =
        formData;
      instance
        .post("/api/auth/company/register", {
          ...otherFields,
          address: {
            street,
            city,
            state,
            postalCode,
            country,
          },
          role: "company",
        })
        .then(async ({ data }) => {
          toast.success(data.message);
          //const company = await instance.post("/signup");
          //console.log(company);
          navigate(`/`);
        })
        .catch(({ response }) => {
          toast.error(response.data.error);
        });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          set(validationErrors, err.path, err.message); // lodash.set for nested errors
        });
        setErrors(validationErrors);
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-5">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 space-y-6 min-h-[500px] min-w-[400px] sm:min-w-[600px]"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">
          Company Registration
        </h2>

        {/* Company Name */}
        <div>
          <div>
            <label
              htmlFor="companyName"
              className="block font-medium text-gray-300"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              placeholder="Company Legal Name"
              onChange={handleInputChange}
              className="w-full border border-gray-700 rounded-lg p-3 mt-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.companyName && (
              <span className="text-red-500">{errors.companyName}</span>
            )}
          </div>
        </div>

        {/* Company Address */}
        <div className="mb-3">
          <label className="block font-medium text-gray-300">
            Company Address
          </label>

          {/* First Row: Street & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full border border-gray-700 rounded-lg p-3 mt-1 mb-2 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.street && (
                <span className="text-red-500 text-sm">{errors.street}</span>
              )}
            </div>

            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-700 rounded-lg p-3 mt-1 mb-2 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>
          </div>

          {/* Second Row: State & Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full border border-gray-700 rounded-lg p-3 mt-1 mb-2 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && (
                <span className="text-red-500 text-sm">{errors.state}</span>
              )}
            </div>

            <div>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full border border-gray-700 rounded-lg p-3 mt-1 mb-2 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.postalCode && (
                <span className="text-red-500 text-sm">
                  {errors.postalCode}
                </span>
              )}
            </div>
          </div>

          {/* Country Field */}
          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border border-gray-700 rounded-lg p-3 mt-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>
        </div>

        {/* Contact Email */}
        <div className="mb-6">
          <label
            htmlFor="contactEmail"
            className="block font-medium text-gray-300"
          >
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            placeholder="youremail@domain.com"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className="w-full border border-gray-700 rounded-lg p-3 mt-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.contactEmail && (
            <span className="text-red-500">{errors.contactEmail}</span>
          )}
        </div>

        {/* Contact Phone */}
        <div className="mb-6">
          <label
            htmlFor="contactPhone"
            className="block font-medium text-gray-300"
          >
            Contact Phone Number
          </label>
          <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            placeholder="9876543210"
            onChange={handleInputChange}
            className="w-full border border-gray-700 rounded-lg p-3 mt-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.contactPhone && (
            <span className="text-red-500">{errors.contactPhone}</span>
          )}
        </div>

        {/* Select Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Select A Strong Password"
            onChange={handleInputChange}
            className="w-full border border-gray-700 rounded-lg p-3 mt-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>

        {/* Re-enter Password */}
        <div className="mb-6">
          <label
            htmlFor="repassword"
            className="block font-medium text-gray-300"
          >
            Re-enter Password
          </label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={formData.repassword}
            placeholder="Re-enter Your Password"
            onChange={handleInputChange}
            className="w-full border border-gray-700 rounded-lg p-3 mt-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.repassword && (
            <span className="text-red-500">{errors.repassword}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CompanyRegister;
