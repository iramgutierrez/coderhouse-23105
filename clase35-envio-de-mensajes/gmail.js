const { createTransport } = require('nodemailer')

const TEST_MAIL = 'iram.coderhouse@gmail.com'
const TEST_PASSWORD = process.env.PASSWORD_MAIL

const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: TEST_PASSWORD
  }
})

const mailOptions = {
  from: 'Servidor Node.js',
  to: TEST_MAIL,
  subject: 'Mail de prueba desde Node.js con archivo adjunto',
  html: `
  <h1 style="color: blue;">
    Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span> con archivo adjunto
  </h1>
  `,
  attachments: [
    {
      path: 'node.png'
    }
  ]
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