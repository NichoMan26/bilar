const {Schema, model} = require('mongoose')

const schema = new Schema({
id: {
  type:Number,
  require:true
},
name: {
  type:String,
},
pass: {
  type:String,
},


})
 module.exports = model('Users', schema)
