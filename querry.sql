-- TABLE USERS
CREATE TABLE users
(
    users_id VARCHAR NOT NULL PRIMARY KEY,
    users_name VARCHAR(255),
    users_email VARCHAR(255),
    users_phone VARCHAR(255),
    users_password VARCHAR(255),
    users_confirmpassword VARCHAR(255),
    users_photo VARCHAR(255)
);

CREATE TABLE recipes
(
    recipes_id VARCHAR PRIMARY KEY,
    recipes_title VARCHAR(255),
    recipes_ingredients VARCHAR(255) ,
    recipes_photo VARCHAR(255),
    recipes_video VARCHAR(255),
    recipes_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categorys_id INT,
    users_id VARCHAR(255)
);

CREATE TABLE comments
(
    comment_id INT PRIMARY KEY,
    recipes_id VARCHAR(255),
    users_id VARCHAR(255),
    comment_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likeds
(
    likeds_id INT PRIMARY KEY,
    recipes_id VARCHAR(255),
    users_id VARCHAR(255)
);

CREATE TABLE bookmarks
(
    bookmarks_id INT PRIMARY KEY,
    recipes_id VARCHAR(255),
    users_id VARCHAR(255)
);
