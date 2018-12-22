var express=require('express');
var bodyParser=require('body-parser');
var {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo.js');
var {User}=require('./models/user.js');
var app=express();
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
    res.status(400).send(e);
  });
});
//GET /todos/12422
app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(400).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(400).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});
app.listen(3000,()=>{
  console.log('Started on port 3000');
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
