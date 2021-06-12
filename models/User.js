const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

class User {
  constructor(firstName, lastName, email, password) {
    this.userId = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date(Date.now());
  }

  save() {
    let sql = `INSERT INTO users(user_id, first_name, last_name, email, created_at, password) VALUES (?,?,?,?,?,?);`;

    const newUser = db.execute(sql, [
      this.userId,
      this.firstName,
      this.lastName,
      this.email,
      this.createdAt,
      this.password,
    ]);

    return newUser;
  }

  static findAll() {
    return db.execute("SELECT * FROM users;");
  }

  static findById(id) {
    let sql = `SELECT * FROM users WHERE id = ?`;

    return db.execute(sql, [id]);
  }

  static findByIdAndUpdate(id, newData) {
    // Run select query for a specific user
    // Close conneciton
    // Return found user
  }

  static findByIdAndDelete(id) {
    // Connect to database
    // Run select query for a specific user
    // Close conneciton
    // Return found user
  }

  static checkPasswordMatch(dbPassword, userPassword) {
    return bcrypt.compare(userPassword, dbPassword);
  }

  static hashPassword(strPassword) {
    return bcrypt.hash(strPassword, 12);
  }
}

module.exports = User;
