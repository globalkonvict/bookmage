const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readDB, writeDB } = require("../utils/db");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

// Register a new user
const register = async (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  let user = db.users.find((u) => u.email === email);
  if (user)
    return res.status(400).json({ message: "User already registered." });

  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User(uuidv4(), email, hashedPassword);
  db.users.push(user);
  writeDB(db);

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_PRIVATE_KEY
  );
  res.json({ token });
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find((u) => u.email === email);
  if (!user)
    return res.status(400).json({ message: "Invalid email or password." });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password." });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_PRIVATE_KEY
  );
  res.json({ token });
};

module.exports = {
  register,
  login,
};
