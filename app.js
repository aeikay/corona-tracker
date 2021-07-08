const express = require('express')
const app = express()

const axios = require('axios')
const _ = require('lodash')

app.set('view engine', 'ejs')

let data = []

app.get('/', (req, res) => {
  var config = {
    method: 'get',
    url: 'https://corona.lmao.ninja/v2/continents?yesterday&sort',
    headers: {},
  }

  axios(config)
    .then(function (response) {
      data = response.data
      console.log(data)
      res.render('home', { content: data })
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.get('/continent/:cont', (req, res) => {
  console.log(req.params.cont)
  for (let i = 0; i < data.length; i++) {
    if (data[i].continent === req.params.cont) {
      console.log(data[i].updated)
      res.render('continents', { continentData: data[i] })
    }
  }
})

app.listen(3000, (req, res) => {
  console.log('Server up and running')
})
