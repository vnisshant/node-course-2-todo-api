const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
//remove
Todo.remove({}).then((result)=>{
  console.log(result);
});
Todo.findOneAndRemove({_id:'abskslks'}).then((todo)=>{

});
Todo.findByIdAndRemove('gdhdja').find((todo)=>{
  console.log(todo);
});
