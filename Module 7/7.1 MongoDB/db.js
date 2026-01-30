//we will store everything related to databaase stuff here.
const mongoose = require ("mongoose") 
const Schema = mongoose.Schema ;  //it imports a class called schema from mongoose library
const ObjectId = mongoose.ObjectId ;

const User = new Schema({
    name : String ,
    email: String ,
    password : String
})

const Todo = new Schema ({
    title: String ,
    done: Boolean,
    userid : ObjectId
})

const UserModel = mongoose.model('Users', User );
const TodoModel = mongoose.model('todos', Todo );

module.exports = {
    UserModel, 
    TodoModel
}