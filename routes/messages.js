const express = require("express");
const Message = require("../models/message");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const router = new express.Router();

/** GET /:id - get detail of message.
 * => {message: {id, body,sent_at, read_at,
 * from_user: {username, first_name, last_name, phone},
 * to_user: {username, first_name, last_name, phone}}
 * Make sure that the currently-logged-in users is either the to or from user. */
router.get("/:id", async (req, res, next) => {
  try {
    const message = Message.get(req.params.id);
    res.json({ message });
  } catch (e) {
    return next(e);
  }
});

/** POST / - post message.
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}} */
router.post("/", async (req, res, next) => {
  try {
    const { to_username, body } = req.body;
    const message = Message.create(to_username, body);
    res.json({ message });
  } catch (e) {
    return next(e);
  }
});

/** POST/:id/read - mark message as read:
 *  => {message: {id, read_at}}
 * Make sure that the only the intended recipient can mark as read. */
router.post("/:id/read", async (req, res, next) => {
  try {
    const message = Message.markRead(req.params.id);
    res.json({ message });
  } catch (e) {
    return next(e);
  }
});
