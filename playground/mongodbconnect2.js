const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err)
  {
    return console.log('Unable to connect to server');
  }
  console.log('Connected to server');

db.collection('Todos').insertOne({
  text:'Go to movie',
  completed:false
},(err,result)=>{
  if(err)
{
  return console.log('unable to add the todo');
}
console.log(JSON.stringify(result.ops,undefined,2));
});
db.collection('Users').insertOne({
  name:'Nishant',
  age:21,
  location:'india'
},(err,result)=>{
  if(err)
  {
    return console.log('Unable to add the user');

  }
  console.log(JSON.stringify(result.ops,undefined,2));
});
db.close();
});
