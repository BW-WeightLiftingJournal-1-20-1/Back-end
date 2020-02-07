const db = require("../data/dbConfig");
const Exercises = require("./exercises-model");

describe("exercise model", function () {
  beforeEach(async () => {
    await db("exercises").truncate();
  })

describe("adds new exercise", function () {
  it("adds new exercise", async function () {
    await Exercises.addExercise({
      "user_id": 1,
      "date": "02-07-2020",
      "name": "Bench Press",
      "body_region": "Chest",
      "weight": 250,
      "reps": 10,
      "sets": 3,
      "journal": "Hit my Max today!"
    })

    const exercises = await db("exercises");
    expect(exercises).toHaveLength(1)
  })
})

describe("deletes exercise", function(){
  it("deletes exercise", async function(){
    await Exercises.addExercise({
      "user_id": 1,
      "date": "02-07-2020",
      "name": "Bench Press",
      "body_region": "Chest",
      "weight": 250,
      "reps": 10,
      "sets": 3,
      "journal": "Hit my Max today!"
    })
    await Exercises.addExercise({
      "user_id": 1,
      "date": "02-07-2020",
      "name": "Squats",
      "body_region": "Legs",
      "weight": 300,
      "reps": 10,
      "sets": 5,
      "journal": "Legs are sore!"
    })

    await Exercises.remove(1);
    const exercises = await db("exercises")
   
    expect(exercises).toHaveLength(1)
  })
})
});

