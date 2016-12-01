// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Twit = require('twit')

var T = new Twit({
  consumer_key:         'TMXmJ9neXXzjsFy8xygKyf6GB',
  consumer_secret:      'AVWToFHjS7yySvraqsiFvPCvFOExra6IxWQP3PVNe7INf2hjvV',
  access_token:         '803748094328406021-kOgAcgv2wqv0rRcvxVgYnF4zJnZP3iv',
  access_token_secret:  'YHhEruPRMWZ5HH9p8gKSHZ7Gi1D4fsJ2T6PIlgvNP8VZH',

})
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;

// ROUTES FOR OUR API
var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// REGISTER OUR ROUTES -------------------------------
router.route('/clubs')

    .post(function(req, res) {

        var bodyName = req.body.name;
        //res.send(err);
        res.json({ message: 'Bear created!' });

    })

    .get(function(req, res) {
        var myArray = req.query.names.split(",");
        //console.log(req);
        var clubParams = myArray.toString().replace(/,/g , " OR ");
        clubParams = clubParams.substr(0,clubParams.length-3);
        console.log(clubParams);
        T.get('search/tweets', { q: clubParams + 'transfer rumours', count: 100, exclude:"retweets" }, function(err, data, response) {
          //res.send(err);
        //res.json(response);
        console.log(response.url);
        res.send(data);
        })

    });



// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
