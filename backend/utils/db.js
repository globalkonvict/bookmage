const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "db.json");

const readDB = () => {
  if (!fs.existsSync(dbFilePath)) {
    return { users: [], books: [] };
  }
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readDB,
  writeDB,
};
