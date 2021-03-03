const pool = require('../utils/pool');

module.exports = class Daycare {
  id;
  name;
  streetAddress;
  state;
  zipcode;
  image;
  phoneNumber;
  day;
  evening;
  infant;
  toddler;
  child;
  older_child;
  snacks;
  covid_plan;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.streetAddress = row.street_address;
    this.state = row.state;
    this.zipcode = row.zipcode;
    this.image = row.image;
    this.phoneNumber = row.phone_number;
    this.day = row.day;
    this.evening = row.evening;
    this.infant = row.infant;
    this.toddler = row.toddler;
    this.child = row.child;
    this.older_child = row.older_child;
    this.snacks = row.snacks;
    this.covid_plan = row.covid_plan;
  }

  static async insert(daycare) {
    const { rows } = await pool.query(`
      INSERT INTO daycares (
        name,
        street_address,
        state,
        zipcode,
        image,
        phone_number,
        day,
        evening,
        infant,
        toddler,
        child,
        older_child,
        snacks,
        covid_plan
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `,
      [daycare.name, daycare.street_address, daycare.state, daycare.zipcode, daycare.image, daycare.phone_number, daycare.day, daycare.evening, daycare.infant, daycare.toddler, daycare.child, daycare.older_child, daycare.snacks, daycare.covid_plan]
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
          zipcode = $4,
          image = $5,
          phone_number = $6,
          day = $7,
          evening = $8,
          infant = $9,
          toddler = $10,
          child = $11,
          older_child = $12,
          snacks = $13,
          covid_plan = $14
        RETURNING *
    `,
      [daycare.name, daycare.street_address, daycare.state, daycare.zipcode, daycare.image, daycare.phone_number, daycare.day, daycare.evening, daycare.infant, daycare.toddler, daycare.child, daycare.older_child, daycare.snacks, daycare.covid_plan]
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
