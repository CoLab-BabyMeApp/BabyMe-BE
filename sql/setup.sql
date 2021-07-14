DROP TABLE IF EXISTS daycares;

CREATE TABLE daycares (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    image TEXT,
    phone_number TEXT NOT NULL,
    day BOOLEAN,
    evening BOOLEAN,
    infant BOOLEAN,
    toddler BOOLEAN,
    child BOOLEAN,
    older_child BOOLEAN,
    snacks BOOLEAN,
    covid_plan BOOLEAN,
    price TEXT NOT NULL,
    coordinates TEXT []
);
