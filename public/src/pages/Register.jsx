import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.avif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { registerRoute, validuserName } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "dark",
    draggable: true,
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const checkuserName = async (userName) => {
    if (userName.length > 3) {
      try {
        const response = await axios.get(`${validuserName}/${userName}`);
        
        if (response.data.exists) {
          return true;
        }
        return false;
      } catch (err) {
        console.error("Error checking userName:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try{
    if(await handleValidation())
      {
        const { name, email, userName, phoneNumber, password } = values;
        const { data } = await axios.post(registerRoute,{
          name, email, userName, phoneNumber, password
        })  
        console.log(data)
        if (data.created === true) {
          localStorage.setItem("jwtToken", data.token);
          navigate("/");
        } else {
          toast.error(data.message, toastOption);
        }

      }
   }
   catch(err){
    console.log(err);
   }

  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneRegex.test(number);
  };


  const handleValidation = async() => {
    const { name, email, userName, phoneNumber, password, confirmPassword } =
      values;
    if (name === "") {
      toast.error("Name can not be empty", toastOption);
      return false;
    } else if (email === "") {
      toast.error("Email can not be empty", toastOption);
      return false;
    } else if (userName === "") {
      toast.error("userName can not be empty", toastOption);
      return false;
    } 
    else if (userName.length < 3) {
      toast.error("userName should be greater than 3 characters", toastOption);
      return false;
    }else if (phoneNumber === "") {
      toast.error("Phone Number can not be empty", toastOption);
      return false;
    } else if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Phone Number is invalid", toastOption);
      return false;
    } else if (password === "") {
      toast.error("Password can not be empty", toastOption);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastOption
      );
      return false;
    } else if (confirmPassword === "") {
      toast.error("Confirm Password should be same as Password", toastOption);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Confirm Password should be same as Password", toastOption);
      return false;
    }
    else if (await checkuserName(userName)) {
     
      toast.error("userName already exists", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    
  };

  return (
    <Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="companyDetails">
          <img src={Logo} alt="Company Logo" />
          <h1> Stock App </h1>
        </div>
        <div className="registerForm">
          <div className="inputFields">
            <label htmlFor="name"> Name </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inputFields">
            <label htmlFor="email"> Email </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inputFields">
            <label htmlFor="userName"> userName </label>
            <input
              type="text"
              name="userName"
              placeholder="userName"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inputFields">
            <label htmlFor="phoneNumber"> Phone Number </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inputFields">
            <label htmlFor="password"> Password </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inputFields">
            <label htmlFor="confirmPassword"> Confirm Password </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit"> Register </button>
          <span>
            {" "}
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <span>
            {" "}
            Want to Register as a Company?{" "}
            <Link to="/companyRegister">Click Here!</Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2c2f33;
  padding: 20px;
  box-sizing: border-box;

  form {
    background: #40444b;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
  }

  .companyDetails {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-align: center;
    margin-bottom: 20px;
  }

  .companyDetails img {
    max-width: 60px;
    border-radius: 20%;
    margin-bottom: 10px;
  }

  .companyDetails h1 {
    font-size: 1.5rem;
    color: #7289da;
    margin: 0;
  }

  .registerForm {
    display: flex;
    flex-direction: column;
  }

  .inputFields {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  label {
    font-size: 1rem;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #40444b;
    background-color: #2c2f33;
    color: #ffffff;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #7289da;
    box-shadow: 0 0 5px rgba(114, 137, 218, 0.5);
  }

  button {
    background: #7289da;
    color: #ffffff;
    padding: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }

  button:hover {
    background: #5c6fb1;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 0.9rem;
    color: #b9bbbe;
    text-align: center;
  }

  span a {
    color: #f04747;
    text-decoration: none;
  }

  span a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    form {
      padding: 20px;
    }

    .companyDetails img {
      max-width: 80px;
    }

    .companyDetails h1 {
      font-size: 1.2rem;
    }
  }
`;

export default Register;
