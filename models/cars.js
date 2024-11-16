
const {Schema, model} = require('mongoose')

const schema = new Schema({
id: {
  type:Number,
  require:true
},
car: {
  type:String,
},
creater: {
  type:String,
},
number: {
  type:String,
},
service: {
  type:String,
},
washer: {
  type:String,
},
shop: {
  type:String,
},
comment: {
  type:String,
},
date: {
  type:Date,
},

})
 module.exports = model('Cars', schema)
