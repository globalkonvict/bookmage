const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/register", validationMiddleware(authSchema), register);
router.post("/login", validationMiddleware(authSchema), login);

module.exports = router;
