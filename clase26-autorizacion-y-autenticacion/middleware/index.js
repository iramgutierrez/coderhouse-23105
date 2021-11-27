const verifyUsername = (req, res, next) => {
    if (!req.body.username) {
      return res.status(400).json({
        error: 'El campo username es necesario'
      })
    }
  
    return next()
  }
  
  const verifyPassword = (req, res, next) => {
    if (!req.body.password) {
      return res.status(400).json({
        error: 'El campo password es necesario'
      })
    }
  
    return next()
  }
  
  module.exports = {
    verifyUsername,
    verifyPassword
  }