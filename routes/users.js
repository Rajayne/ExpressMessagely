const express = require("express");
const User = require("../models/user");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const router = new express.Router();
/** GET / - get list of users.
 * => {users: [{username, first_name, last_name, phone}, ...]} */
router.get("/", async (res, req, next) => {
  try {
    const users = await User.all();
    res.json({ users });
  } catch (e) {
    return next(e);
  }
});

/** GET /:username - get detail of users.
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}} */
router.get("/:username", ensureCorrectUser, async (res, req, next) => {
  try {
    const user = await User.get(req.params.username);
    res.json({ user });
  } catch (e) {
    return next(e);
  }
});

/** GET /:username/to - get messages to user
 * => {messages: [{id, body, sent_at, read_at, from_user: {username, first_name, last_name, phone}}, ...]} */
router.get("/:username/to", ensureCorrectUser, async (res, req, next) => {
  try {
    const messagesTo = await User.messagesTo(req.params.username);
    res.json({ messagesTo });
  } catch (e) {
    return next(e);
  }
});

/** GET /:username/from - get messages from user
 * => {messages: [{id, body, sent_at,  read_at, to_user: {username, first_name, last_name, phone}}, ...]} */
router.get("/:username/from", ensureCorrectUser, async (res, req, next) => {
  try {
    const messagesFrom = await User.messagesFrom(req.params.username);
    res.json({ messagesFrom });
  } catch (e) {
    return next(e);
  }
});
