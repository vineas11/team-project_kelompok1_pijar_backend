const commonHelper = require("../helper/common");
const {
  selectAllComments,
  selectComments,
  insertComments,
  updateComments,
  deleteComments,
  countData,
  findID,
} = require("../model/comments");

const commentsController = {
    getAllComments: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "comment_id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllComments({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getSelectComments: async (req, res) => {
    const recipes_id = Number(req.params.recipes_id);
    const { rowCount } = await findID(recipes_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectComments(recipes_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  insertcomments: async (req, res) => {
    const { recipes_id, users_id, comment_text} = req.body;
    const {
      rows: [count],
    } = await countData();
    const comment_id = Number(count.count) + 1;
    const data = {
        comment_id,
        recipes_id, 
        users_id, 
        comment_text,
        created_at
    };
    insertComments(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Comment Success")
      )
      .catch((err) => res.send(err));
  },

  updateComments: async (req, res) => {
    try {
      const comment_id = Number(req.params.id);
      const { comment_text } = req.body;
      const { rowCount } = await findID(comment_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        comment_id,
        recipes_id, 
        users_id, 
        comment_text,
        created_at
      };
      updateComments(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Update comment Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteComments: async (req, res, next) => {
    try {
      const comment_id = Number(req.params.id);
      const { rowCount } = await findID(comment_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteComments(comment_id)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Delete comment Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = commentsController;
