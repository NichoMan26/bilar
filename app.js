const express = require('express')
const app = express()
const cors = require('cors')
// const mysql = require('mysql')
const request = require('request')
const mongoose = require('mongoose')
const http = require('http')
const multer  = require("multer");

const server = http.createServer(app)


const bodyParser = require("body-parser");
const PORT = require('./config.js')
const urlencodedParser = bodyParser.json();

const users = require('./models/users')
const cars = require('./models/cars')

// const conn = mysql.createConnection({
//   host:'basenkodenis.ru',
//   user:'u1055291_denis',
//   database:'u1055291_bilar',
//   password:'4AdZWykWQb6any7',
// })

app.use(express.urlencoded({extended:true}))
      async function start() {
          try {
              await mongoose.connect('mongodb+srv://basenkodenis:CsXspZG1m9kdx63B@cluster0.ydkxs.mongodb.net/bilar', {
              })
              server.listen(PORT, () => {
                  console.log(`Server has been started on ${PORT}`);
              })
          } catch(e) {
              console.log('e: ', e);
  
          }
}
app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("filedata"));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

app.use(cors())


start()



// -------------CARS-------------
app.get('/:shop', urlencodedParser,  async (req, res) => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth.length < 2 ? '0' + (+date.getMonth()+1) : (+date.getMonth()+1)
    let day = date.getDate()
    let shop = req.params.shop
    console.log('shop: ', shop);
  let toDay = year +'-' + +month +'-' + day
  let result = await cars.find({ shop:'Terminal'})
  console.log('result: ', result);

  res.json(result)
 
})


app.post('/', urlencodedParser,  async(req, res) => {
  if(!req.body) return res.sendStatus(400)
    let r = req.body
  const newItem = new cars({
    id:r.id,
    car:r.car || '',
    creater:r.creater,
    number:r.number||'',
    service:r.service,
    washer:r.washer||'',
    shop:r.shop||'',
    comment:r.comment||'',
    date:new Date(),
  })
  await newItem.save()
  res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});

})

app.put('/', urlencodedParser, async(req, res) => {
  if(!req.body) return res.sendStatus(400)
  let r = req.body
  await cars.updateOne( 
    { id:r.id },
    { $set: { 
              car:r.car,
              creater:r.creater,
              number:r.number,
              service:r.service,
              washer:r.washer,
              shop:r.shop,
              comment:r.comment,
            } 
    },) 

  res.sendStatus(200)
})

app.delete('/', urlencodedParser, async(req, res) => {
  if(!req.body) return res.sendStatus(400)
    let r = req.body
    await cars.deleteOne( { id:r.id }) 
})




app.post('/report', urlencodedParser,  async (req, res) => {
  let obj = {date:{$gte:new Date(),$lte:new Date()},}
  
  console.log("req.body:" , req.body);
  if(req.body.from && req.body.to){
    obj.date = {$gte:req.body.from,$lte:req.body.to}
  }
  if(req.body.washer!=="All"){
    obj.$or = [{washer:req.body.washer},{creater:req.body.washer}]
  }
  if(req.body.shop!=="All"){
    obj.shop = req.body.shop
  }
  if(req.body.service!=="All"){
    obj.service = req.body.service
  }
let result = await cars.find(obj)


res.json(result)

})



app.post('/search', urlencodedParser, async(req, res) => {
if(!req.body) return res.sendStatus(400)
  console.log('req.body: ', req.body);
let searchWord = req.body.searchWord
  // let result = await cars.find({number:/a/})
  let result = await cars.find({number:new RegExp('.*' + searchWord + '.*')})
console.log('result: ', result);


res.json(result)
})


app.post('/user', urlencodedParser, async(req, res) => {
  if(!req.body) return res.sendStatus(400)
  let result = await users.find({name:req.body.name, pass:req.body.password})
  if(result[0]){
    res.json(result)
    }

})
