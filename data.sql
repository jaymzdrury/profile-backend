CREATE DATABASE profile;

CREATE TABLE profile (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(30),
    about JSONB,
    experience JSONB,
    services JSONB,
    contacts JSONB
)

CREATE TABLE email (
    email VARCHAR(255),
    title VARCHAR(30),
    msg VARCHAR(30)
)

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
)