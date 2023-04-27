const jwt = require("jsonwebtoken");
const express = require("express");
const router = new express.Router();

const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

/** POST /login - login: {username, password} => {token}
 * Make sure to update their last-login! */

/** POST /register - register user: registers, logs in, and returns token.
 * {username, password, first_name, last_name, phone} => {token}.
 *  Make sure to update their last-login! */
router.post("/register", async (res, req, next) => {
  const { username } = await User.register(req.body);
  let token = jwt.sign({ username }, SECRET_KEY);
  res.json({ token });
});
