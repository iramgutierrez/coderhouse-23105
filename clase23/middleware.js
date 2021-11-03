const verifyUsername = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      error: 'El campo username es obligatorio'
    })
  }

  return next()
}

const verifyPassword = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({
      error: 'El campo password es obligatorio'
    })
  }

  return next()
}

module.exports = {
  verifyUsername,
  verifyPassword
}