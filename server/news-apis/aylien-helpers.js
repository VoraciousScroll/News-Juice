var aylienKeys = require('../../keys.js').aylien;
var AylienNewsApi = require('aylien-news-api');

/************* AYLIEN API HELPERS ********************/

// Instantiate AylienNewsApi model
var api = new AylienNewsApi.DefaultApi();

// Configure API ID: app_id
var app_id = api.apiClient.authentications['app_id'];
app_id.apiKey = aylienKeys.app_id;

// Configure API key: app_key
var app_key = api.apiClient.authentications['app_key'];
app_key.apiKey = aylienKeys.app_key;

var timelineData = function(input, res) {

  // more options here: https://newsapi.aylien.com/docs/endpoints/time_series/nodejs

  var opts = {
    'title': input,
    'language': ['en'],
    'publishedAtStart': 'NOW-175DAYS',
    'publishedAtEnd': 'NOW'
  };

  api.listTimeSeries(opts, function(err, data) {
    if (err) {
      console.log('<------ERROR--------->', err);
    } else {
      console.log('API called successfully. Returned data: ' + data);
      res.send(data);
    }
  });
};

var articleImport = function(input, res, start, end){

  var opts = {
    'title': input,
    'language': ['en'],
    'sortBy': 'relevance',
    'publishedAtStart': start,
    'publishedAtEnd': end,
    'perPage': 3
  };

  api.listStories(opts, function(err, data) {
    if (err) {
      console.log('<------ERROR--------->', err);
    } else {
      console.log('API called successfully. Returned data: ' + data);
      res.send(data);
    }
  });

};

module.exports = {
  timelineData: timelineData,
  articleImport: articleImport
};