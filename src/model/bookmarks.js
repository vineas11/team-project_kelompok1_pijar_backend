const Pool = require("../config/db");

// GET ALL Coments
const selectAllBookmarks = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM bookmarks ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

// SELECT RICAPES BY users id and recipes id
const selectBookmarks = (users_id) => {
  return Pool.query(`
  SELECT bookmarks.*, users.*, recipes.*
  FROM bookmarks
  LEFT JOIN users ON bookmarks.users_id = users.users_id
  LEFT JOIN recipes ON bookmarks.recipes_id = recipes.recipes_id
  WHERE bookmarks.users_id = '${users_id}'
  `);
};

// INSERT Coments
const insertBookmarks = (data) => {
  const { bookmarks_id, recipes_id, users_id } = data;
  return Pool.query(
    `INSERT INTO bookmarks (bookmarks_id, recipes_id, users_id) 
    VALUES(${bookmarks_id}, '${recipes_id}', '${users_id}' )`
  );
};

// UPDATE Coments
const updateBookmarks = (data) => {
  const { bookmarks_id, recipes_id, users_id } = data;
  return Pool.query(
    `UPDATE bookmarks SET recipes_id='${recipes_id}' users_id='${users_id}' WHERE bookmarks_id=${bookmarks_id}`
  );
};

// DELETE Coments
const deleteBookmarks = (bookmarks_id) => {
  return Pool.query(`DELETE FROM bookmarks WHERE bookmarks_id=${bookmarks_id}`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM bookmarks");
};

//
const findID = (bookmarks_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT bookmarks FROM bookmarks WHERE bookmarks_id=${bookmarks_id}`,
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

const findBookmarksRecipesId = (recipes_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM bookmarks WHERE recipes_id='${recipes_id}'`,
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

const findBookmarksUsersId = (users_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM bookmarks WHERE users_id='${users_id}'`,
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
  selectAllBookmarks,
  selectBookmarks,
  insertBookmarks,
  updateBookmarks,
  deleteBookmarks,
  findBookmarksRecipesId,
  findBookmarksUsersId,
  countData,
  findID,
};
