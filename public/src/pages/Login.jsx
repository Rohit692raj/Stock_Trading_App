import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.avif";
import { ToastContainer, toast } from "react-toastify";

function Login() {

    const[values,setValues] = useState({
      userName :"",
      password:""
    })

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  
  const handleChange = async(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }


  return (
    <Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="companyDetails">
          <img src={Logo} alt="Company Logo" />
          <h1> Stock App </h1>
        </div>
        <div className="LoginForm">
         
          <div className="inputFields">
            <label htmlFor="userName"> userName </label>
            <input type="text" name="userName" placeholder="userName" onChange={(e)=> handleChange(e)}  />
          </div>
          
          <div className="inputFields">
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" placeholder="Password" onChange={(e)=> handleChange(e)} />
          </div>
        
          <button type="submit"> Login </button>
          <span>
            {" "}
            Don't have an account? <Link to="/register"> Register Here </Link>
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

  .LoginForm {
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

export default Login;
