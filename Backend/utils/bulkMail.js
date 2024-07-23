const nodemailer = require('nodemailer')

const sendBulkEmail =async options =>{
    const transPort = {
       host:process.env.SMTP_HOST,
       port:process.env.SMTP_PORT,
       auth:{
           user:process.env.SMTP_USER,
           pass:process.env.SMTP_PASS
       }
    };
    
    const transporter = nodemailer.createTransport(transPort)
    const message = {
       from:`Admin <${options.fromemail}>`,
       to: options.email,
       subject:options.subject,
       text:options.message
    }
    await transporter.sendMail(message)
 }
 module.exports = sendBulkEmail