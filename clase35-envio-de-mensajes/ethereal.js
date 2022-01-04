const { createTransport } = require('nodemailer')

const TEST_MAIL = 'miles.sauer67@ethereal.email'
const TEST_PASSWORD = 'gvS2XV9bEX2vUUE4Kj'

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: TEST_PASSWORD
  }
})

const mailOptions = {
  from: 'Servidor Node.js',
  to: TEST_MAIL,
  subject: 'Mail de prueba desde Node.js',
  html: `
  <h1 style="color: blue;">
    Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span>
  </h1>
  `
}

const sendEmail = async () => {
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
  } catch(error) {
    console.error(error)
  }
}

sendEmail()