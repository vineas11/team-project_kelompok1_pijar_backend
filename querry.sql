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
    categorys_id INT,
    users_id VARCHAR(255)
);

CREATE TABLE categorys
(
    categorys_id INT PRIMARY KEY,
    categorys_name VARCHAR(255)
)


CREATE TABLE video
(
    video_id VARCHAR PRIMARY KEY,
    video_title VARCHAR(255),
    video_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recipes_id VARCHAR(255)
)