var googleTrends = require('google-trends-api');

/************************ GOOGLE TRENDS **********************************/

var hotTrends = function(res, limit, country) {  
// hotTrends pull top # of trends from specified country
  // resultLimit: Number
  // country: String, ex: 'US', default is US
  country = country || 'US';
  googleTrends.hotTrends(country)
    .then(function (response) {
      res.send(response.slice(limit));
    })
    .catch(function(error) {
      console.log(error, 'ERROR! WITH GOOGLE TRENDS');
    });
};


var hotTrendsDetail = function(res, limit, country) {  
// hotTrends pull top # of trends from specified country
  // resultLimit: Number
  // country: String, ex: 'US', default is US
  // Response: Array of objects of each individual trend
  country = country || 'US';
  googleTrends.hotTrendsDetail(country)
    .then(function (response) {
      res.send(response.rss.channel[0].item.slice(limit));
    })
    .catch(function(error) {
      console.log(error, 'ERROR! WITH GOOGLE TRENDS');
    });
};

module.exports = {
  hotTrends: hotTrends,
  hotTrendsDetail: hotTrendsDetail
};

