const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");

class User {
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}*/
  static async register({ username, password, first_name, last_name, phone }) {
    const hashPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const newUser = await db.query(
      `INSERT INTO users (
        username, 
        password, 
        first_name, 
        last_name, 
        phone,
        joine_at,
        last_login_at) 
      VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp) RETURNING username`,
      [username, hashPassword, first_name, last_name, phone]
    );
    return newUser.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */
  static async authenticate(username, password) {}

  /** Update last_login_at for user */
  static async updateLoginTimestamp(username) {}

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */
  static async all() {}

  /** Get: get user by username
   * returns {username, first_name, last_name, phone, join_at, last_login_at } */
  static async get(username) {}

  /** Return messages from this user.
   * [{id, to_user, body, sent_at, read_at}]
   * where to_user is {username, first_name, last_name, phone} */
  static async messagesFrom(username) {}

  /** Return messages to this user.
   * [{id, from_user, body, sent_at, read_at}]
   * where from_user is {username, first_name, last_name, phone} */
  static async messagesTo(username) {}
}

module.exports = User;