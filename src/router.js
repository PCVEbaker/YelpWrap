const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('./controllers/mainController.js')

router.use(bodyParser.json());

router.post('/search', function(req, res){
  var qs; // qs are the params for request to yelps api 
  if(req.body.location) { //this if statement to check wheter location was given in human readable (zip code etc.) or coordinates
    qs = {term: req.body.term,
      location: req.body.location};
  } else {
    qs = {term: req.body.term,
      latitude: req.body.lat,
      longitude: req.body.lng};
  }
  
  const options = {
    url: 'https://api.yelp.com/v3/businesses/search?',
    headers: {'Authorization': `Bearer ${config.Yelp_TOKEN}` },
    qs: qs
  }; 

  request(options, (err, response, body) => {
    var results = JSON.parse(body);
    res.send(results)

  })
})

router.post('/user', (req, res) => {
  controllers.user.add(req.body, () => {
    res.status(200).send();
  })
})

router.post('/favorite', (req, res) => {
  controllers.favorite.add(req.body, () => {
    res.status(200).send();
  })
})

module.exports = router;
