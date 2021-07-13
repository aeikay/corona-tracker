const express = require('express')
const app = express()

const axios = require('axios')
const _ = require('lodash')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

let data = []
let countrydata = []
let worlddata = []

app.get('/', (req, res) => {
  var config = {
    method: 'get',
    url: 'https://corona.lmao.ninja/v2/continents?yesterday&sort',
    headers: {},
  }

  axios(config)
    .then(function (response) {
      data = response.data
      // console.log(data)
    })
    .catch(function (error) {
      console.log(error)
    })
  var configcountry = {
    method: 'get',
    url: 'https://corona.lmao.ninja/v2/countries?yesterday&sort',
    headers: {},
  }

  axios(configcountry)
    .then(function (response) {
      countrydata = response.data
      // console.log(countrydata)
    })
    .catch(function (error) {
      console.log(error)
    })

  var configall = {
    method: 'get',
    url: 'https://corona.lmao.ninja/v2/all?yesterday',
    headers: {},
  }

  axios(configall)
    .then(function (response) {
      worlddata = response.data
      res.render('home', { content: data, worlddata: worlddata })
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.get('/continent/:cont', (req, res) => {
  // console.log(req.params.cont)
  for (let i = 0; i < data.length; i++) {
    if (data[i].continent === req.params.cont) {
      console.log(data[i].updated)
      res.render('continents', { continentData: data[i] })
    }
  }
})

app.get('/continent/country/:country', (req, res) => {
  for (let i = 0; i < countrydata.length; i++) {
    if (
      _.lowerCase(countrydata[i].country) === _.lowerCase(req.params.country)
    ) {
      res.render('country', { countrydata: countrydata[i] })
      break
    } else if (i === countrydata.length - 1) {
      res.render('countryerror.ejs', { wrongCountryName: countryName })
    }
  }
})

app.post('/', (req, res) => {
  let countryName = req.body.country

  for (let i = 0; i < countrydata.length; i++) {
    if (_.lowerCase(countrydata[i].country) === _.lowerCase(countryName)) {
      // console.log(countrydata[i])
      // console.log(countrydata[i].countryInfo.flag)
      res.render('country', { countrydata: countrydata[i] })
      break
    } else if (i === countrydata.length - 1) {
      res.render('countryerror.ejs', { wrongCountryName: countryName })
    }
  }
})

app.listen(3000, (req, res) => {
  console.log('Server up and running')
})
