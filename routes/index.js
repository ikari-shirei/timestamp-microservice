var express = require('express')
var router = express.Router()

const { DateTime } = require('luxon')

/* GET date. */
router.get('/:date', function (req, res, next) {
  const timestamp = req.params.date

  const isDateUTC = new Date(timestamp).getTime() > 0
  const isDateUnix = new Date(timestamp * 1000) > 0

  const dt = DateTime

  if (isDateUTC) {
    const unix = Math.floor(new Date(timestamp).getTime() / 1000)
    const utc = dt.fromJSDate(new Date(timestamp)).toHTTP()

    res.json({ unix: unix, utc: utc })
    return
  }

  if (isDateUnix) {
    // * 1 needed, otherwise it returns null
    const utc = dt.fromJSDate(new Date(timestamp * 1)).toHTTP()

    res.json({
      unix: timestamp,
      utc: utc,
    })
    return
  }

  res.status(500).json({ error: 'Invalid date.' })
})

module.exports = router
