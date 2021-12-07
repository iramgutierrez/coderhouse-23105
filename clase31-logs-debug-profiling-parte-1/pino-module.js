const pino = require('pino')

const loggers = {
  dev: () => {
    const logger = pino()
    logger.level = 'info'
    return logger
  },
  prod: () => {
    const logger = pino()
    logger.level = 'warn'
    return logger
  }
}

module.exports = (env_variable) => {
  return env_variable === 'PROD' ? loggers.prod() : loggers.dev()
}
