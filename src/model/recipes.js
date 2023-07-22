const Pool = require("../config/db");

// GET ALL RECIPES
const selectAllRecipes = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT *
  FROM recipes
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

// SELECT RICAPES BY ID
const selectRecipesById = (recipes_id) => {
  return Pool.query(`
  SELECT *
  FROM recipes
  WHERE recipes.recipes_id='${recipes_id}'`);
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
    recipes_title,
    recipes_ingredients,
    recipes_photo,
    recipes_video,
    users_id,
  } = data;
  return Pool.query(
    `INSERT INTO recipes (recipes_id, recipes_title, recipes_ingredients, recipes_photo, recipes_video, users_id) VALUES('${recipes_id}', '${recipes_title}', '${recipes_ingredients}', '${recipes_photo}', '${recipes_video}', '${users_id}')`
  );
};

// UPDATE RECIPES
const updateRecipes = (data) => {
  const {
    recipes_id,
    recipes_title,
    recipes_ingredients,
    recipes_photo,
    recipes_video,
  } = data;
  return Pool.query(
    `UPDATE recipes SET recipes_title='${recipes_title}', recipes_ingredients='${recipes_ingredients}' ,recipes_photo='${recipes_photo}',recipes_video='${recipes_video}' WHERE recipes_id='${recipes_id}'`
  );
};

// DELETE RECIPES
const deleteRecipes = (recipes_id) => {
  return Pool.query(`DELETE FROM recipes WHERE recipes_id='${recipes_id}'`);
};

const deleteRecipesByUsersId = (users_id, recipes_id) => {
  return Pool.query(`DELETE FROM recipes WHERE recipes.users_id='${users_id}' AND recipes.recipes_id='${recipes_id}'`);
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

// FIND UUID
const findUsersId = (users_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT recipes FROM recipes WHERE users_id='${users_id}'`,
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
  selectRecipesById,
  selectRecipesByUserId,
  insertRecipes,
  updateRecipes,
  deleteRecipes,
  deleteRecipesByUsersId,
  countData,
  findUUID,
  findUsersId,
};
