const db = require("../data/dbConfig");

module.exports = {
  getAll,
  add,
  findBy,
  findById,
  addExercise
}

function getAll() {
  return db("users")
    .select("id", "username")
    .orderBy("id")
};

function add(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then(ids => {
      return findById(ids[0])
    })
};

function addExercise(newExercise) {
  return db("exercises")
    .insert(newExercise, "id")
    .then(ids => {
      return findById(ids[0])
    })
};

function findBy(filter) {
  return db("users")
    .where(filter)
};

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
};
