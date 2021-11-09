'use strict'

const {mapUser, getRandomFirstName, mapActicles} = require('./util')

// db connection and settings
const connection = require('./config/connection')
let userCollection
let articlesCollection
let studentsCollection
run()

async function run() {
  // await connection.connect()
  // await connection.get().dropCollection('users')
  // await connection.get().createCollection('users')
  // userCollection = connection.get().collection('users')

  // await connection.connect()
  // await connection.get().dropCollection('articles')
  // await connection.get().createCollection('articles')
  // articlesCollection = connection.get().collection('articles')

  await connection.connect()
  studentsCollection = connection.get().collection('students')

  // await example1()
  // await example2()
  // await example3()
  // await example4()
  // await hwExample1()
  // await hwExample2()
  // await hwExample3()
  // await hwExample4()
  // await hwExample5()
  await studentsExample1()
  await studentsExample2()
  await studentsExample3()
  await studentsExample4()
  await studentsExample5()
  await studentsExample6()
  await studentsExample7()
  console.log('111');
  await connection.close()
}

// #### Users

// - Create 2 users per department (a, b, c)
async function example1() {
  try {
    const deps = ['a', 'a', 'b', 'b', 'c', 'c']
    const users = deps.map((department) => mapUser({department}));
    // console.log('-----------------------------------------');
    // console.log('users', users);
    // console.log('-----------------------------------------');

    const res = await userCollection.insertMany(users)
    console.log('-----------------------------------------');
    console.log('res', res);
    console.log('-----------------------------------------');

  } catch (err) {
    console.error(err)
  }
}

// - Delete 1 user from department (a)

async function example2() {
  try {
    const res = await userCollection.deleteOne({department: 'a'});
    console.log('-----------------------------------------');
    console.log(res);
    console.log('-----------------------------------------');
  } catch (err) {
    console.error(err)
  }
}

// - Update firstName for users from department (b)

async function example3() {
  try {
    // const res = await userCollection.updateMany({department: 'b'}, {$set: {firstName: 'Oleh'}});
    const usersB = await userCollection.find({department: 'b'}).toArray()
    const bulkWrite = usersB.map(user => ({
      updateOne: {
        filter: {_id: user._id},
        update: {$set: {firstName: getRandomFirstName()}}
      }
    }))
    const {result} = await userCollection.bulkWrite(bulkWrite)
    console.log(`Updated ${result.nModified} users`)
  } catch (err) {
    console.error(err)
  }
}

// - Find all users from department (c)
async function example4() {
  try {
    const res = await userCollection.find({department: 'c'}).toArray();
    console.log('-----------------------------------------');
    console.log(res);
    console.log('-----------------------------------------');
  } catch (err) {
    console.error(err)
  }
}





// #### Articles

// - Create 5 articles per each type (a, b, c)
async function hwExample1() {
  try {
    const types = ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c'];
    const articles = types.map((type) => mapActicles({type , tags: ['Oleh']}))
    const {result} = await articlesCollection.insertMany(articles);
    console.log('------------------------------------------------------');
    console.log(`Add ${result.n} user`);
    console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}

// - Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]
async function hwExample2() {
  try {
    const {result} = await articlesCollection.updateMany({type: 'a'},{$set: {tags: ['tag1-a', 'tag2-a', 'tag3']}});
    console.log('------------------------------------------------------');
    console.log(`Updated ${result.n} articles with type a`);
    console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}

// - Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a
async function hwExample3() {
  try {
    const {result} = await articlesCollection.updateMany({type: {$ne: 'a'}},{$set: {tags: ['tag2', 'tag3', 'super']}});
    console.log('------------------------------------------------------');
    console.log(`Updated ${result.n} articles with other types except a`);
    console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}
// - Find all articles that contains tags [tag2, tag1-a]
async function hwExample4() {
  try {
    const res = await articlesCollection.find({tags: {$in:['tag2','tag1-a']}}).toArray();
    console.log('------------------------------------------------------');
    console.log('All all articles that contains tags [tag2, tag1-a]: \n', res);
    console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}
// - Pull [tag2, tag1-a] from all articles
async function hwExample5() { 
  try {
    const {result} = await articlesCollection.updateMany({tags: {$in:['tag2','tag1-a']}} ,{$pull: {tags: {$in: ['tag2','tag1-a']}}});
    console.log('------------------------------------------------------');
    console.log(`Tags: [tag2, tag1-a] was pulled from ${result.n} articles`);
    console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}


// #### Students

// - Find all students who have the worst score for homework, sort by descent
async function studentsExample1() { 
  try {
    const result = await studentsCollection.aggregate([
      {$unwind: '$scores'},
      {$match: {'scores.type':'homework'}},
      {$sort: {'scores.2.score': -1}}
  ]).toArray();
    // console.log('------------------------------------------------------');
    // console.log(result);
    // console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}

// - Find all students who have the best score for quiz and the worst for homework, sort by ascending
async function studentsExample2() { 
  try {
    const result = await studentsCollection.aggregate([
      {$match: {
        $and:[
            {scores:{$exists: true}},
            {'scores.1.score': {$gt: 90}},
            {'scores.2.score': {$lt: 20}}
          ]}
      },
      {$sort: {'scores.1.score': 1}}
  ]).toArray();
    // console.log('------------------------------------------------------');
    // console.log(result);
    // console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}

// - Find all students who have best scope for quiz and exam
async function studentsExample3() { 
  try {
    const result = await studentsCollection.aggregate([
      {$match: {
        $and:[
            {scores:{$exists: true}},
            {'scores.0.score': {$gt: 90}},
            {'scores.1.score': {$gt: 90}}
          ]}
      }
  ]).toArray();
    // console.log('------------------------------------------------------');
    // console.log(result);
    // console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}

// - Calculate the average score for homework for all students
async function studentsExample4() { 
  try {
    const result = await studentsCollection.aggregate([
      {$unwind:"$scores"},
      {$match:{'scores.type': 'homework'}},
      {$group: {  
              _id: "scores.type",
              hwAvg: { $avg: '$scores.score' }
          }}
  ]).toArray();
    console.log('------------------------------------------------------');
    console.log(result);
    console.log('------------------------------------------------------');
  } catch (err) {
    console.error(err)
  }
}

// - Delete all students that have homework score <= 60
async function studentsExample5() { 
  try {
    const result = await studentsCollection.aggregate([
      {$unwind:"$scores"},
      {$match:{'scores.type': 'homework'}},
      {$match: {'scores.score': {$lte: 60}}}
  ]).forEach(function(elem){
    studentsCollection.deleteMany({"_id": elem._id})
  });
  } catch (err) {
    console.error(err)
  }
}

// - Mark students that have quiz score => 80
async function studentsExample6() { 
  try {
    const result = await studentsCollection.aggregate([
      {$unwind:"$scores"},
      {$match:{'scores.type': 'quiz'}},
      {$match: {'scores.score': {$gte: 80}}},
      {$addFields: { mark: true}}
  ]);
  } catch (err) {
    console.error(err)
  }
}

/*
- Write a query that group students by 3 categories (calculate the average grade for three subjects)
  - a => (between 0 and 40)
  - b => (between 40 and 60)
  - c => (between 60 and 100)
*/
async function studentsExample7() { 
  try {
    const result = await studentsCollection.aggregate([
      {$match : {scores: {$exists: true}}},
      {$addFields: {avgScore: { $avg : '$scores.score'}}},
      {$addFields: {
        group: { 
            $switch: {
                branches: [
                    {
                        case: { $lt: [ "$avgScore", 40 ] }, then: 'a'
                    },
                    {
                        case: { $gte: [ "$avgScore", 61 ] }, then: 'c'
                    },
                    {
                        case: { $and: [
                                { gte: [ "$avgScore", 40 ] },
                                { lt: [ "$avgScore", 60 ] }
                            ]}, then: 'b'
                    }
                ],default: "No scores found."
           }
        }
   }},
   {$group: {
        "_id": "$group",
        "totalScoreOfGroup": {"$sum": '$avgScore'},
        "studentsCountInGroup": {"$sum":1}
       }}
]).toArray();
console.log(result);
  } catch (err) {
    console.error(err)
  }
}

/*
!!!!!!!!!!!

I imported all data from students.json to mongoDB by using terminal 
and command: mongoimport --db tc --collection students --file D:\TechMagic\homeworks\tm_homeworks\mongoDB\mongo-homework\students.json --jsonArray --drop
but also I have to be in ...\MongoDB\Server\4.4\bin folder to do this

!!!!!!!!!!!
*/