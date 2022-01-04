const twilio = require('twilio')

const accountSid = 'AC2f0ae20b8b799af641f26ae83a56daf3'
const authToken = '977944cb3bd03c64aa0866bbd6b75ee9'

const client = twilio(accountSid, authToken)

const sendSMS = async () => {
  try {
    const message = await client.messages.create({
      body: 'Hola soy un SMS desde Node.js',
      from: '+12626983214',
      to: '+525576639967'
    })

    console.log(message)
  } catch (error) {
    console.error(error)
  }
}

sendSMS()