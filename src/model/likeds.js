const Pool = require("../config/db");

// GET ALL Coments
const selectAllLikeds = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM likeds ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

// SELECT RICAPES BY users and recipes id
const selectLikeds = (users_id) => {
  return Pool.query(`
  SELECT likeds.*, users.*, recipes.*
  FROM likeds
  LEFT JOIN users ON likeds.users_id = users.users_id
  LEFT JOIN recipes ON likeds.recipes_id = recipes.recipes_id
  WHERE likeds.users_id = '${users_id}'
  ` );
};

// INSERT Coments
const insertLikeds = (data) => {
  const { likeds_id, recipes_id, users_id } = data;
  return Pool.query(
    `INSERT INTO likeds (likeds_id, recipes_id, users_id) 
    VALUES(${likeds_id}, '${recipes_id}', '${users_id}' )`
  );
};

// UPDATE Coments
const updateLikeds = (data) => {
  const { likeds_id, recipes_id, users_id } = data;
  return Pool.query(
    `UPDATE likeds SET recipes_id='${recipes_id}' users_id='${users_id}' WHERE likeds_id=${likeds_id}`
  );
};

// DELETE Coments
const deleteLikeds = (likeds_id) => {
  return Pool.query(`DELETE FROM likeds WHERE likeds_id=${likeds_id}`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM likeds");
};

//
const findID = (likeds_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT likeds FROM Likeds WHERE likeds_id=${likeds_id}`,
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

module.exports = {
  selectAllLikeds,
  selectLikeds,
  insertLikeds,
  updateLikeds,
  deleteLikeds,
  countData,
  findID,
};
