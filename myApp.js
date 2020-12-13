require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let baby = new Person({
    name: "Baby",
    age: 34,
    favoriteFoods: ["chocolate", "mangosteen", "ice cream"],
  });
  baby.save((err, data) => {
    if (err) return console.error(message.err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {
    name: "Baby",
    age: 34,
    favoriteFoods: ["chocolate", "mangosteen", "ice cream"],
  },
  {
    name: "Also Baby",
    age: 31,
    favoriteFoods: ["steak", "butter", "fried chicken"],
  },
  {
    name: "Zoey",
    age: 5,
    favoriteFoods: ["food", "yellow things", "garbage"],
  },
  {
    name: "Pluto",
    age: 5,
    favoriteFoods: ["used tissues", "dinner", "yellow things"],
  },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err) return console.log(err.message)
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, foundPerson) => {
    if(err) return console.log(err.message)
    done(null, foundPerson);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) return console.log(err.message)
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, foundPerson)=>{
    if(err) return console.log(err.message)
  done(null, foundPerson);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person)=>{
    if(err) return console.log(err.message)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, person)=>{
      if(err) return console.log(err.message)
      done(null, person);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, changedPerson)=>{
    if(err) return console.log(err.message)
    done(null, changedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err, person)=>{
    if(err) return console.log(err.message)
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany( {name: nameToRemove},(err, person)=>{
    if(err) return console.log(err.message)
    done(null, person);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}, done).sort({name: 'asc'}).limit(2).select({age: false}).exec(data=>{
    if(err) console.log(err.message)
    done(err, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
