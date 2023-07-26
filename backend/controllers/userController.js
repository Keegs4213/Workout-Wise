//userController.js
"use strict";

const axios = require("axios"); // npm i
const Models = require("../models"); //matches index.js

const getUsers = (req, res) => {
  //finds all users
  Models.User.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getUser = (req, res) => {
  // finds user based on id
  Models.User.findById(req.params.id)
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const addUser = (req, res) => {
  const user = req.body;

  console.log(user);
  new Models.User(user)
    .save()
    .then((user) => res.send({ result: 200, data: user }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
const updateUser = (req, res) => {
  Models.User.findByIdAndUpdate(
    req.params.id, 
    { $set: req.body }, 
    { useFindAndModify: false, new: true } // Adding 'new: true' returns the updated document
  )
  .then((data) => {
    if (req.body) {
      data.profileImageUrl = req.body.profileImageUrl; // Update the profile image URL
      data.weight = req.body.weight; 
      data.height = req.body.height; 
      data.fitnessGoal = req.body.fitnessGoal; 
      data.save(); // Save the changes
    }
    res.send({ result: 200, data })
  })
  .catch((err) => {
    console.log(err);
    res.send({ result: 500, error: err.message });
  });
};

const deleteUser = (req, res) => {
  //deletes the user matching the ID from the param
  Models.User.findByIdAndRemove(req.params.id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
