const commonHelper = require("../helper/common");
const {
  selectAllCategorys,
  selectCategorys,
  insertCategorys,
  updateCategorys,
  deleteCategorys,
  countData,
  findID,
} = require("../model/categorys");

const categorysController = {
  getAllCategorys: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "categorys_id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllCategorys({ limit, offset, sort, sortby });
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

  getSelectCategorys: async (req, res) => {
    const categorys_id = Number(req.params.id);
    const { rowCount } = await findID(categorys_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectCategorys(categorys_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  insertCategorys: async (req, res) => {
    const { categorys_name } = req.body;
    const {
      rows: [count],
    } = await countData();
    const categorys_id = Number(count.count) + 1;
    const data = {
      categorys_id,
      categorys_name,
    };
    insertCategorys(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Product Success")
      )
      .catch((err) => res.send(err));
  },

  updateCategorys: async (req, res) => {
    try {
      const categorys_id = Number(req.params.id);
      const { categorys_name } = req.body;
      const { rowCount } = await findID(categorys_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        categorys_id,
        categorys_name,
      };
      updateCategorys(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Update Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategorys: async (req, res, next) => {
    try {
      const categorys_id = Number(req.params.id);
      const { rowCount } = await findID(categorys_id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteCategorys(categorys_id)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            200,
            "Delete Category Success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categorysController;
