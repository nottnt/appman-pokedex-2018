const express = require('express')
const cors = require('cors')
const every = require('lodash/every')
const filter = require('lodash/filter')
const toUpper = require('lodash/toUpper')
const get = require('lodash/get')
const includes = require('lodash/includes')
const app = express()

const { cards } = require('./../mock/cards.json')

app.use(cors())

app.get('/api/cards', (req, res) => {
  const { name, type, limit = 20 } = req.query

  if (every([name, type], item => item === undefined)) {
    return res.json({ cards: cards.slice(0, limit) })
  }

  res.json({
    cards: filter(cards, card => {
      const name = toUpper(get(req, 'query.name', ''))
      const type = toUpper(get(req, 'query.type', ''))
      const checkName =includes(toUpper(card.name), name)
      const checkType =includes(toUpper(card.type), type)
      return checkName || checkType
    }).slice(0, limit)
  })

})

app.listen(3030, () => console.log('app start @ port 3030'))