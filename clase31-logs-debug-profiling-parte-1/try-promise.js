module.exports = (data) => {
  return new Promise((resolve, reject) => {
    getInfo(data, (err, results) => {
      if (err) {
        return reject(err)
      }

      return resolve(results)
    })
  })
}