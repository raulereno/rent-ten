const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPW
    }
  })
  transporter.verify().then(() => {
    console.log('ready for send emails')
  })

module.exports = {
    transporter
}