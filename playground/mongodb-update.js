//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to the MongoDb server');
  }
  console.log('Connected to MongoDb server');
  //findOneAndUpdate
  db.collection('Todos').findOneAndUpdate({
    _id:new ObjectID('5c1ba932ca92aa1a6026a7b1')
  },{
    $set:{
      completed:true
    }
  },{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  });
  db.collection('Users').findOneAndUpdate({
    _id:new ObjectID('5c19554e20056c11accb8f55')
  },{
    $set:{
      name:'Avengers'
    },

    $inc:{
      age:1
    }
  },{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  });

});
