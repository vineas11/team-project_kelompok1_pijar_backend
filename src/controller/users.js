const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");
let {
  selectAllUsers,
  selectUsers,
  deleteUsers,
  createUsers,
  updateUsers,
  findUUID,
  findEmail,
  countData,
} = require("../model/users");

let usersController = {
  getAllUsers: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "users_id";
      const sort = req.query.sort || "ASC";
      let result = await selectAllUsers({ limit, offset, sort, sortby });
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
        "Get Users Data Success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },

  getSelectUsers: async (req, res) => {
    const users_id = String(req.params.id);
    const { rowCount } = await findUUID(users_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectUsers(users_id)
      .then((result) => {
        commonHelper.response(
          res,
          result.rows,
          200,
          "Get Users Detail Success"
        );
      })
      .catch((err) => res.send(err));
  },

  registerUsers: async (req, res) => {
    const {
      users_name,
      users_email,
      users_phone,
      users_password,
      users_confirmpassword,
    } = req.body;
    const { rowCount } = await findEmail(users_email);
    if (rowCount) {
      return res.json({ message: "Email Already Taken" });
    }
    const users_id = uuidv4();
    const result = await cloudinary.uploader.upload(req.file.path);
    const users_photo = result.secure_url;
    const schema = Joi.object().keys({
      users_email: Joi.required(),
      users_name: Joi.string().required(),
      users_phone: Joi.string().min(10).max(12),
      users_password: Joi.string().min(3).max(15).required(),
      users_confirmpassword: Joi.ref("users_password"),
    });
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      return res.send(error.details);
    }
    const users_confirmpasswordHash = bcrypt.hashSync(users_confirmpassword);
    const data = {
      users_id,
      users_name,
      users_email,
      users_phone,
      users_confirmpasswordHash,
      users_photo,
    };
    createUsers(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create User Success")
      )
      .catch((err) => res.send(err));
  },

  updateUsers: async (req, res) => {
    try {
      const {
        users_name,
        users_email,
        users_phone,
        users_password,
        users_confirmpassword,
      } = req.body;
      const users_id = String(req.params.id);
      const { rowCount } = await findUUID(users_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const schema = Joi.object().keys({
        users_email: Joi.string().email().required(),
        users_name: Joi.string().required(),
        users_phone: Joi.string().min(10).max(12),
        users_password: Joi.string().min(3).max(15).required(),
        users_confirmpassword: Joi.ref("users_password"),
      });
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        return res.send(error.details);
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      const users_photo = result.secure_url;
      const users_confirmpasswordHash = bcrypt.hashSync(users_confirmpassword);
      const data = {
        users_id,
        users_name,
        users_email,
        users_phone,
        users_confirmpasswordHash,
        users_photo,
      };
      updateUsers(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      const users_id = String(req.params.id);
      const { rowCount } = await findUUID(users_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteUsers(users_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  loginUsers: async (req, res) => {
    const { users_email, users_confirmpassword } = req.body;
    // const {
    //   rows: [users],
    // } = await findEmail(users_email);
    // if (!users) {
    //   return res.json({ message: "Email Wrong" });
    // }
    const {
      rows: [users],
    } = await findEmail(users_email);
    if (!users) {
      return res.json({ message: "Email Wrong" });
    }
    const isValidPassword = bcrypt.compareSync(
      users_confirmpassword,
      users.users_confirmpassword
    );
    if (!isValidPassword) {
      return res.json({ message: "Password Wrong" });
    }
    delete users.users_confirmpassword;
    const payload = {
      users_email: users.users_email,
    };
    users.token_user = authHelper.generateToken(payload);
    users.refreshToken = authHelper.generateRefreshToken(payload);
    commonHelper.response(res, users, 201, "Login Successfuly");
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      users_email: decoded.users_email,
    };
    const result = {
      token_user: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = usersController;
