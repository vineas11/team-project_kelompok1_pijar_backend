const Pool = require("../config/db");

// GET ALL Categorys
const selectAllCategorys = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM categorys ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

// SELECT RICAPES BY USERS ID
const selectCategorys = (categorys_id) => {
  return Pool.query(
    `SELECT * FROM categorys WHERE categorys_id = ${categorys_id}`
  );
};

// INSERT Categorys
const insertCategorys = (data) => {
  const { categorys_id, categorys_name } = data;
  return Pool.query(
    `INSERT INTO categorys (categorys_id, categorys_name) 
    VALUES(${categorys_id}, '${categorys_name}')`
  );
};

// UPDATE Categorys
const updateCategorys = (data) => {
  const { categorys_id, categorys_name } = data;
  return Pool.query(
    `UPDATE categorys SET categorys_name='${categorys_name}' WHERE categorys_id=${categorys_id}`
  );
};

// DELETE Category
const deleteCategorys = (categorys_id) => {
  return Pool.query(`DELETE FROM categorys WHERE categorys_id=${categorys_id}`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM categorys");
};

//
const findID = (categorys_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT categorys_id FROM categorys WHERE categorys_id=${categorys_id}`,
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
  selectAllCategorys,
  selectCategorys,
  insertCategorys,
  updateCategorys,
  deleteCategorys,
  countData,
  findID,
};
