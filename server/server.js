require('./config/config');
const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo.js');
var {User}=require('./models/user.js');
var app=express();
const port=process.env.PORT;//for heroku seployment
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
  //console.log(req.body);
  var todo=new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(404).send(e);
  });
});
//GET /todos/12422
app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send();
  });
});
app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send();
  });
});
app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed)&&body.completed){
    body.completedAt=new Date().getTime();
  }
  else
    {
  body.completed=false;
  body.completedAt=null;}
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo)
    {
    return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send();
  });
});
app.listen(3000,()=>{
  console.log(`Started on port ${port}`);
});
module.exports={app};
// var newUser=new User({
//   email:'vnishant@gmail.com'
// });
// newUser.save().then((doc)=>{
//   console.log('User added',doc);
// },(e)=>{
//   console.log('Unable to add user',e);
// })
// var newTodo=new Todo({
//   text:'Cook Dinner'
//
// });
// newTodo.save().then((doc)=>{
//   console.log('Saved todo',doc);
// },(e)=>{
//   console.log('Unable to add todo');
// });
// var otherTodo=new Todo({
//   text:'Feed the cat',
//   completed:true,
//   completedAt:123
// });
// otherTodo.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2))
// },(e)=>{
//   console.log('Unable to add todo');
// });
