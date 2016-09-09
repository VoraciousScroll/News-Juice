var googleTrends = require('google-trends-api');

/************************ GOOGLE TRENDS **********************************/

var hotTrends = function(res, limit, country) {  
// hotTrends pull top # of trends from specified country
  // resultLimit: Number
  // country: String, ex: 'US', default is US
  country = country || 'US';
  googleTrends.hotTrends(country)
    .then(function (response) {
      res.send(response.slice(0, limit));
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
      // res.send(response.rss.channel[0].item.slice(limit));
      var results = response.rss.channel[0].item;
      var sortedResults = sortByTraffic(results);
      res.send(sortedResults.slice(0, limit));
    })
    .catch(function(error) {
      console.log(error, 'ERROR! WITH GOOGLE TRENDS');
    });
};

module.exports = {
  hotTrends: hotTrends,
  hotTrendsDetail: hotTrendsDetail
};


var sortByTraffic = function(result) {
  result.sort(function(a, b) {
    return trafficToNumber(b['ht:approx_traffic'][0]) - trafficToNumber(a['ht:approx_traffic'][0]);
  });
  return result;
};


var trafficToNumber = function (traffic) {
  return Number(traffic.replace('+', '').replace(',', '').replace(',', ''));
};


