const Pool = require("../config/db");

// GET ALL RECIPES
const selectAllRecipes = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT *
  FROM recipes
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

// SELECT RICAPES BY USERS ID
const selectRecipesByUserId = (users_id) => {
  return Pool.query(`
  SELECT *
  FROM recipes
  LEFT JOIN users ON recipes.users_id = users.users_id
  WHERE recipes.users_id='${users_id}'`);
};

// INSERT RECIPES
const insertRecipes = (data) => {
  const {
    recipes_id,
    categorys_id,
    recipes_title,
    recipes_ingredients,
    recipes_photo,
    recipes_video,
    users_id,
  } = data;
  return Pool.query(
    `INSERT INTO recipes (recipes_id, categorys_id, recipes_title, recipes_ingredients, recipes_photo, recipes_video, users_id) VALUES('${recipes_id}', ${categorys_id}, '${recipes_title}', '${recipes_ingredients}', '${recipes_photo}', '${recipes_video}', '${users_id}')`
  );
};

// UPDATE RECIPES
const updateRecipes = (data) => {
  const {
    recipes_id,
    categorys_id,
    recipes_title,
    recipes_ingredients,
    recipes_photo,
    recipes_video,
    users_id,
  } = data;
  return Pool.query(
    `UPDATE recipes SET categorys_id=${categorys_id}, recipes_title='${recipes_title}', recipes_ingredients='${recipes_ingredients}' ,recipes_photo='${recipes_photo}',recipes_video='${recipes_video}' , users_id='${users_id}' WHERE recipes_id='${recipes_id}'`
  );
};

// DELETE RECIPES
const deleteRecipes = (recipes_id) => {
  return Pool.query(`DELETE FROM recipes WHERE recipes_id='${recipes_id}'`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM recipes");
};

// FIND UUID
const findUUID = (recipes_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT recipes FROM recipes WHERE recipes_id='${recipes_id}'`,
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
  selectAllRecipes,
  selectRecipesByUserId,
  insertRecipes,
  updateRecipes,
  deleteRecipes,
  countData,
  findUUID,
};
