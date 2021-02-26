DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS daycares;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    user_location TEXT NOT NULL
);

CREATE TABLE daycares (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    name TEXT NOT NULL,
    street_address TEXT NOT NULL,
    state TEXT NOT NULL,
    image TEXT NOT NULL,
    phone_number TEXT NOT NULL
);

