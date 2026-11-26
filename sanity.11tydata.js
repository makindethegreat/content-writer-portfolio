const {fetchSanityData} = require('./lib/sanity')

module.exports = async function () {
  return fetchSanityData()
}
