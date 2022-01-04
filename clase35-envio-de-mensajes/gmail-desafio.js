const { createTransport } = require('nodemailer')
const parseArgs = require('minimist')


const TEST_MAIL = 'iram.coderhouse@gmail.com'
const PASSWORD_MAIL = process.env.PASSWORD_MAIL

const args = parseArgs(process.argv.slice(2))

if (!args.to) {
  throw new Error('Parámetro to es obligatorio')
}

const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: PASSWORD_MAIL
  }
})

const defaultSubject = 'Mail de prueba desde Node.js'
const defaultHTML = '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'

const mailOptions = {
  from: 'Servidor Node.js',
  to: args.to,
  subject: args.subject || defaultSubject,
  html: args.html || defaultHTML,
  attachments: []
}

if (args.file) {
  mailOptions.attachments.push({
    path: args.file
  })
}

const sendEmail = async () => {
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
  } catch (error) {
    console.log(err)
  }
}

sendEmail()
