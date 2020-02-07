const db = require("../data/dbConfig");

module.exports = {
  getAll,
  userExercises,
  update,
  remove,
  findById,
  getById,
  addExercise
};

function userExercises(id) {
  return db("exercises")
    .join("users", "exercises.user_id", "users.id")
    .select("exercises.id", "exercises.date", "exercises.name", "exercises.body_region", "exercises.weight", "exercises.reps", "exercises.sets", "exercises.journal", "exercises.user_id")
    .where("exercises.user_id", id);
};

function getById(id) {
  return db("exercises")
  .where({ id })
  .first();
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

function addExercise(newExercise) {
  return db("exercises")
    .insert(newExercise)
    .then(ids => {
      return findById(ids[0]);
    });
}