const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  passwordHash;
  userLocation;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.userLocation = row.user_location;
  }

  static async insert(user) {
    const { rows } = await pool.query(`
      INSERT INTO users (
        email,
        password_hash,
        user_location
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [user.email, user.passwordHash, user.userLocation]
    );

    return new User(rows[0]);
  }

  static async updateUser(user, id) {
    const { rows } = await pool.query(`
      UPDATE users
        SET 
          email = $1,
          user_location = $5
    `,
      [user.email, user.userLocation, id]
    );

    return new User(rows[0]);
  }

  toJSON() {
    const obj = { ...this };
    delete obj.passwordHash;

    return obj;
  }
}
