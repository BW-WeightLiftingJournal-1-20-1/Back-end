const db = require("../data/dbConfig");

module.exports = {
  getAll,
  update,
  remove,
  findById,
  get
};

function get() {
  return db("exercises")
  .orderBy("user_id");
}

function getAll() {
  return db("exercises")
    .orderBy("user_id");
}

function update(changes, id) {
  return db("exercises")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("exercises")
    .where({ id })
    .del();
}

function findById(id) {
  return db("exercises")
  .where({id})
  .first()
}