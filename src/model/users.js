const Pool = require("../config/db");

//GET ALL USERS
const selectAllUsers = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM users ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

//GET SELECT USERS
const selectUsers = (users_id) => {
  return Pool.query(`SELECT * FROM users WHERE users_id = '${users_id}'`);
};

//DELETE SELECT USERS
const deleteUsers = (users_id) => {
  return Pool.query(`DELETE FROM users WHERE users_id = '${users_id}'`);
};

//POST USERS
const createUsers = (data) => {
  const {
    users_id,
    users_email,
    users_password,
    users_confirmpasswordHash,
    users_name,
    users_phone,
    users_photo,
  } = data;
  return Pool.query(`INSERT INTO users(users_id, users_email, users_password, users_confirmpassword,  users_name, users_phone, users_photo) 
    VALUES ('${users_id}','${users_email}','${users_password}','${users_confirmpasswordHash}','${users_name}',
    '${users_phone}','${users_photo}')`);
};

//PUT SELECT USERS
const updateUsers = (data) => {
  const {
    users_id,
    users_email,
    users_password,
    users_confirmpasswordHash,
    users_name,
    users_phone,
    users_photo,
  } = data;
  return Pool.query(
    `UPDATE users SET users_photo = '${users_photo}', users_email = '${users_email}', users_password = '${users_password}', users_confirmpassword = '${users_confirmpasswordHash}', users_name = '${users_name}', users_phone = '${users_phone}' WHERE users_id = '${users_id}'`
  );
};

//FIND EMAIL
const findUUID = (users_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE users_id= '${users_id}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const findEmail = (users_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE users_email= '${users_email}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

//COUNT DATA
const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM users`);
};

module.exports = {
  selectAllUsers,
  selectUsers,
  deleteUsers,
  createUsers,
  updateUsers,
  findUUID,
  findEmail,
  countData,
};
