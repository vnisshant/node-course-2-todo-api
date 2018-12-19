//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to the MongoDb server');
  }
  console.log('Connected to MongoDb server');
  db.collection('Todos').insertOne({
    text:'Go to work',
    completed:false
  },(err,result)=>{
    if(err)
    {
      return console.log('Unable to insert todo',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });
  db.collection('Users').insertOne({
    name:'Nishant',
    age:21,
    location:'India'
  },(err,result)=>{
    if(err)
    {
      return console.log('Unable to insert user',err);
    }
    console.log(result.ops);
    console.log(result.ops[0]._id.getTimestamp());
  });
  db.close();
});
