const twilio = require('twilio')
const parseArgs = require('minimist')

const args = parseArgs(process.argv.slice(2))
if (!args.to) {
  throw new Error('Parámetro to es obligatorio')
}

args.to = `+${args.to}`

console.log({ args })

const accountSid = 'AC2f0ae20b8b799af641f26ae83a56daf3'
const authToken = '977944cb3bd03c64aa0866bbd6b75ee9'

const client = twilio(accountSid, authToken)

const defaultBody = 'Hola soy un SMS desde Node.js!'

const sendSMS = async () => {
  try {
    const message = await client.messages.create({
      body: args.body || defaultBody,
      from: '+12626983214',
      to: args.to
    })
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

sendSMS()
