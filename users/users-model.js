const db = require("../data/dbConfig");

module.exports = {
  getAll,
  add,
  findBy,
  findById,
  addExercise,
  userExercises
};

function getAll() {
  return db("users")
    .select("id", "username")
    .orderBy("id");
}

function userExercises(id) {
  return db("exercises")
    .join("users", "exercises.user_id", "user.id")
    .select("exercises.id", "exercises.date", "exercises.name", "exercises.body_region", "exercises.weight", "exercises.reps", "exercises.sets", "exercises.journal", "exercises.user_id")
    .where("exercises.user_id", id);
};

// function getExercises(id) {
//   return db("exercises")
//     .join("users", "exercises.user_id", "user.id")
//     .select("exercises.id", "exercises.sets", "exercises.reps", "exercises.body_region", "exercises.weight", "exercises.date", "exercises.journal", "exercises.name", "exercises.user_id")
//     .where("exercises.user_id", id);
// }

function add(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then(ids => {
      return findById(ids[0]);
    });
}

function addExercise(newExercise) {
  return db("exercises")
    .insert(newExercise)
    .then(ids => {
      return findById(ids[0]);
    });
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
