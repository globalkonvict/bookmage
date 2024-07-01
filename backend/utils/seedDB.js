const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");
const { readDB, writeDB } = require("./db");

function generateFakeBooks(numberOfBooks) {
  const books = [];
  for (let i = 0; i < numberOfBooks; i++) {
    books.push({
      id: uuidv4(),
      userId: "edd9d13e-ac25-4b72-9296-819050e0c67e",
      title: faker.lorem.sentence(), // Random title
      author: faker.person.fullName(), // Random author name
      year: faker.date.between({from: new Date().setFullYear(1900), to: new Date() }).getFullYear(), // Random future year
      genre: faker.music.genre(), // Random genre, using music genre as an example
    });
  }
  return books;
}

// Example usage:
const fakeBooks = generateFakeBooks(200);
const db = readDB();

db.books = [...db.books, ...fakeBooks];

writeDB(db);

console.log("Fake books generated and saved to db.json");
