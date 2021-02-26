const pool = require('../utils/pool');

module.exports = class Daycare {
  id
  userId;
  name;
  streetAddress;
  state;
  image;
  phoneNumber;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.streetAddress = row.street_address;
    this.state = row.state;
    this.image = row.image;
    this.phoneNumber = row.phone_number;
  }

  static async insert(daycare) {
    const { rows } = await pool.query(`
      INSERT INTO daycares (
        name,
        street_address,
        state,
        image,
        phone_number
        )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [daycare.name, daycare.street_address, daycare.state, daycare.image, daycare.phone_number]
    );

    return new Daycare(rows[0]);
  }

  static async getDaycares() {
    const { rows } = await pool.query(`
      SELECT * FROM daycares
    `,
    );

    return rows.map(daycare => new Daycare(daycare));
  }

  static async update(daycare) {
    const { rows } = await pool.query(`
      UPDATE daycares
        SET name = $1,
          street_address = $2,
          state = $3,
          image = $4,
          phone_number = $5
        RETURNING *
    `,
      [daycare.name, daycare.street_address, daycare.state, daycare.image, daycare.phone_number]
    );

    return new DayCare(rows[0]);
  }

  static async deleteDaycare(daycareId) {
    const { rows } = await pool.query(`
      DELETE FROM daycares WHERE id = $1 RETURNING *
    `, [id]
    );

    return new Daycare(rows[0]);
  }
};
