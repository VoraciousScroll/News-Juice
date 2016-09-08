var googleTrends = require('google-trends-api');


var hotTrends = function(res, limit, country) {  
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