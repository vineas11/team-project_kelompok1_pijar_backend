const { v4: uuidv4 } = require("uuid");
const createError = require('http-errors');
const commonHelper = require('../helper/common');
const cloudinary = require("../middlewares/cloudinary");
const {
  selectAllRecipes,
  selectRecipesByUserId,
  insertRecipes,
  updateRecipes,
  deleteRecipes,
  countData,
  findUUID,} = require('../model/recipes');


const recipesController = {
    
  getAllRecipes: async(req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 100;
        const offset = (page - 1) * limit;
        const sortby = req.query.sortby || "id";
        const sort = req.query.sort || "ASC";
        const result = await selectAllRecipes({ limit, offset, sort, sortby });
        const { rows: [count] } = await countData();
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage,
        };
      
        commonHelper.response(res, result.rows, 200, "get data success", pagination);
      } catch (error) {
        console.log(error);
      }
      
  },

  getRecipesByUserId: (req, res, next) => {
    const id_user = req.params.id_user.trim();
    selectRecipesByUserId(id_user)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },

  insertRecipes: async(req, res) => {
    const recipes_video = req.files['video'][0].filename;
    const recipes_photo = req.files['photo'][0].filename;    
    const {id_category,recipes_title,recipes_ingredients,id_user} = req.body
    const recipes_id = uuidv4();
    const data ={
        recipes_id,
        recipes_title ,
        recipes_ingredients ,
        recipes_video:`http://localhost:3000/video/${video}` ,
        recipes_photo:`http://localhost:3000/img/${photo}`,
        id_category,
        id_user,
    }
    insertRecipes(data)
    .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Product Success")
      )
      .catch((err) => res.send(err));
  },
 
  updateRecipe: async(req, res) => {
    try{
      const recipes_id = String(req.params.recipes_id)
      const recipes_video = req.files['video'][0].filename;
      const recipes_photo = req.files['photo'][0].filename;    
      const { id_category,recipes_title,recipes_ingredients} = req.body
      const {rowCount} = await findUUID(recipes_id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      const data ={
        recipes_id,
        recipes_title ,
        recipes_ingredients ,
        recipes_video:`http://localhost:3000/video/${video}` ,
        recipes_photo:`http://localhost:3000/img/${photo}`,
        id_category,
      }
      updateRecipes(data)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch(err => res.send(err)
          )
        }catch(error){
          console.log(error);
        }
  },
   deleteRecipe: async (req, res, next) => {
    try {
      const recipes_id = String(req.params.recipes_id);
      const { rowCount } = await findUUID(recipes_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      await deleteRecipes(recipes_id); 
      commonHelper.response(res, {}, 200, "Recipe deleted"); 
    } catch (error) {
      next(error);
    }
  }
}

module.exports = recipesController