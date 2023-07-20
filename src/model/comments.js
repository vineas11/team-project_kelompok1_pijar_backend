const Pool = require("../config/db");

// GET ALL Coments
const selectAllComments = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM comments ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

// SELECT RICAPES BY product ID
const selectComments = (recipes_id) => {
  return Pool.query(
    `SELECT * FROM comments WHERE recipes_id = '${recipes_id}'`
  );
};

// INSERT Coments
const insertComments = (data) => {
  const { comment_id, recipes_id, users_id, comment_text,created_at } = data;
  return Pool.query(
    `INSERT INTO comments (comment_id, recipes_id, users_id, comment_text,created_at) 
    VALUES(${comment_id}, '${recipes_id}', '${users_id}', '${comment_text}', '${created_at}' )`
  );
};

// UPDATE Coments
const updateComments = (data) => {
  const {comment_id, recipes_id, users_id, comment_text,created_at } = data;
  return Pool.query(
    `UPDATE comments SET recipes_id='${recipes_id}' users_id='${users_id}', comment_text='${comment_text}',created_at${created_at} WHERE comment_id=${comment_id}`
  );
};

// DELETE Coments
const deleteComments = (comment_id) => {
  return Pool.query(`DELETE FROM comments WHERE Coments_id=${comment_id}`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM comments");
};

//
const findID = (comment_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT comment_id FROM comments WHERE Coments_id=${comment_id}`,
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
  selectAllComments,
  selectComments,
  insertComments,
  updateComments,
  deleteComments,
  countData,
  findID,
};
