const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure:true,
  auth: {
    user: 'karlgromov80@mail.ru',
    pass: 'sosok55555'
    
  }
});

const mailer = message => {
  let info = transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err);
    console.log('Email Sent:', info);
  });
}
module.exports = mailer