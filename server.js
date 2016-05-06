var alain = require('alain')
var Twitter = require('twitter')

var t = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

var name
var date

function tweet () {
  name = alain.sync({ exactly: 1 })
  date = new Date().toISOString()
  t.post('statuses/update', { status: name }, function (err, tweet, response) {
    if (err) {
      console.log('%s ERROR %s', date, name, err)
      return
    }
    if (tweet) {
      console.log('%s success! %s', date, name)
      return
    }
    console.log('%s ¯\\_(ツ)_/¯ %s', date, name, response)
  })
}

tweet()
setInterval(tweet, parseInt(process.env.INTERVAL || '600000', 10)) // 10 minute default
