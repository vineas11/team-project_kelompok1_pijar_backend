const Pool = require("../config/db");

// GET ALL RECIPES
const selectAllRecipes = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT *
  FROM recipes
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

// SELECT RICAPES BY USERS ID
const selectRecipesByUserId = (id_user) => {
  return Pool.query(`
  SELECT *
  FROM recipes
  LEFT JOIN users ON recipes.id_user = users.id
  WHERE recipes.id_user='${id_user}'`);
};

// INSERT RECIPES
const insertRecipes = (data) => {
  const { recipes_id, id_category, recipes_title, recipes_ingredients, recipes_photo, recipes_video, id_user } = data;
  return Pool.query(
    `INSERT INTO recipes (recipes_id, id_category, recipes_title, recipes_ingredients, recipes_photo, recipes_video, id_user) VALUES('${recipes_id}', ${id_category}, '${recipes_title}', '${recipes_ingredients}', '${recipes_photo}', '${recipes_video}', '${id_user}')`
  );
};

// UPDATE RECIPES
const updateRecipes = (data) => {
  const { recipes_id, id_category, recipes_title, recipes_ingredients, recipes_photo, recipes_video, id_user} = data;
  return Pool.query(
    `UPDATE recipes SET id_category=${id_category}, recipes_title='${recipes_title}', recipes_ingredients='${recipes_ingredients}' ,recipes_photo='${recipes_photo}' ,recipes_video='${recipes_video}', id_user='${id_user}' WHERE recipes_id='${recipes_id}'`
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

// 
const findUUID = (recipes_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM recipes WHERE recipes_id='${recipes_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
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
