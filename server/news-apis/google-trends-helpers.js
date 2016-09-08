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

module.exports = {
  hotTrends: hotTrends
};