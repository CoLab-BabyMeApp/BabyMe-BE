const pool = require('../utils/pool');

module.exports = class Daycare {
  id;
  name;
  streetAddress;
  city;
  state;
  zipCode;
  image;
  phoneNumber;
  day;
  evening;
  infant;
  toddler;
  child;
  olderChild;
  snacks;
  covidPlan;
  price;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.streetAddress = row.street_address;
    this.city = row.city;
    this.state = row.state;
    this.zipCode = row.zip_code;
    this.image = row.image;
    this.phoneNumber = row.phone_number;
    this.day = row.day;
    this.evening = row.evening;
    this.infant = row.infant;
    this.toddler = row.toddler;
    this.child = row.child;
    this.olderChild = row.older_child;
    this.snacks = row.snacks;
    this.covidPlan = row.covid_plan;
    this.price = row.price;
  }

  static async insert(daycare) {
    const { rows } = await pool.query(`
      INSERT INTO daycares (
        name,
        street_address,
        city,
        state,
        zip_code,
        image,
        phone_number,
        day,
        evening,
        infant,
        toddler,
        child,
        older_child,
        snacks,
        covid_plan,
        price
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
      `,
      [
        daycare.name,
        daycare.streetAddress,
        daycare.city,
        daycare.state,
        daycare.zipCode,
        daycare.image,
        daycare.phoneNumber,
        daycare.day,
        daycare.evening,
        daycare.infant,
        daycare.toddler,
        daycare.child,
        daycare.olderChild,
        daycare.snacks,
        daycare.covidPlan,
        daycare.price
      ]
    );

    return new Daycare(rows[0]);
  }

  static async findAllDaycares() {
    const { rows } = await pool.query(
      'SELECT * FROM daycares',
    );

    return rows.map(row => new Daycare(row));
  }

  static async findDaycareById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM daycares 
      WHERE id = $1
    `,
      [id]
    );

    if (!rows[0]) return null;
    return new Daycare(rows[0]);
  }

  static async updateDaycareById(id, daycare) {
    const { rows } = await pool.query(`
      UPDATE daycares
      SET name = $1,
        street_address = $2,
        city = $3
        state = $4,
        zip_code = $5,
        image = $6,
        phone_number = $7,
        day = $8,
        evening = $9,
        infant = $10,
        toddler = $11,
        child = $12,
        older_child = $13,
        snacks = $14,
        covid_plan = $15,
        price = $16
      WHERE id = $17
      RETURNING *
    `,
      [
        daycare.name,
        daycare.streetAddress,
        daycare.city,
        daycare.state,
        daycare.zipCode,
        daycare.image,
        daycare.phoneNumber,
        daycare.day,
        daycare.evening,
        daycare.infant,
        daycare.toddler,
        daycare.child,
        daycare.olderChild,
        daycare.snacks,
        daycare.covidPlan,
        daycare.price
      ]
    );

    return new DayCare(rows[0]);
  }

  static async deleteDaycare(id) {
    const { rows } = await pool.query(`
      DELETE FROM daycares 
      WHERE id = $1 
      RETURNING *
    `,
      [id]
    );

    if (!rows[0]) return null;
    return new Daycare(rows[0]);
  }
};
