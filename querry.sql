-- TABLE USERS
CREATE TABLE users
(
    users_id VARCHAR NOT NULL PRIMARY KEY,
    users_name VARCHAR(255),
    users_email VARCHAR(255),
    users_phone VARCHAR(255),
    users_password VARCHAR(255),
    users_photo VARCHAR(255)
);
