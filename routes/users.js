const express = require("express");
const router = express.Router();

// UUID
const uuid = require("uuid");

// Helper Validation Functions
const { postValidation, putValidation } = require("../utils/validation");

// Hard-coded Database
const users = require("../db/Users");

// Map the given param placeholder name to the given callback
router.param("id", (req, res, next, id) => {
  const user = users.find((user) => user.id == id);
  const userIndex = users.findIndex((user) => user.id == id);

  if (user && userIndex !== -1) {
    req.user = user;
    req.index = userIndex;

    users.forEach((user) => {
      if (user.id == id) {
        user.name = req.body.name ? req.body.name : user.name;
        user.username = req.body.username ? req.body.username : user.username;
        user.email = req.body.email ? req.body.email : user.email;
        user.phone = req.body.phone ? req.body.phone : user.phone;
      }
    });

    next();
  } else {
    res.status(404).json({ Message: `User with ID of ${id} Does Not Exist!` });
  }
});

// GET all users
router.get("/", (req, res) => {
  res.json(users);
});

// GET one specific user
router.get("/:id", (req, res) => {
  res.json(req.user);
});

// POST a user
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  };

  const { error } = postValidation(req.body);
  if (!error) {
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ Message: error.details[0].message });
  }
});

// PUT a user
router.put("/:id", (req, res) => {
  const { error } = putValidation(req.body);
  if (!error) {
    res.json({ Message: "User Updated!", User: req.user });
  } else {
    res.status(400).json({ Message: error.details[0].message });
  }
});

// DELETE a user
router.delete("/:id", (req, res) => {
  users.splice(req.index, 1);
  res.status(204).json();
});

module.exports = router;
