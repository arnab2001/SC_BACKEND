const express = require("express");
const user = require("../models/user");

const bcrypt = require("bcrypt");

module.exports={
UserRegistration,
Login
} ;




async function UserRegistration(req, res, next) {
  
    try {


      const salt = await bcrypt.genSalt(10);
      const Secpassword = await bcrypt.hash(req.body.Password, salt);
      console.log("Secpassword=>",Secpassword);
      const data = await user.create({
       Name:req.body.Name,
       Email:req.body.Email,
       Password:Secpassword,
       

      });
              console.log("data->",data);
  
      return res.status(200).json("Register Succesfully");
    } catch (error) {
      console.log("error : ", error);
      
      return next(error);
    }
  }



  
  async function Login(req, res, next) {
    const { Email, Password } = req.body;
    if (!Email || !Password)
      return res
        .status(400)
        .json({ message: "Please provide email and password " });
  
    try {
      const data = await user.find({ Email: Email });
                
      if (!data) {
        console.log("No user exist with this email.");
        return res.status(401).json({ message: "No user exist with this email" });
      }
      const pass = await user.findOne({ Email: Email });
      if (!bcrypt.compareSync(Password, pass.Password)) {
        return res.status(402).json({ message: "Password Incorrect" });
      } else {
        console.log("Login Successfully done now");
        return res.status(200).json({ pass} );
      }
  
    } catch (err) {
      console.log("Error in getUsers : ", err);
      return res.status(400).json(err);
    }
  }
  