var googleTrends = require('google-trends-api');


var hotTrends = function(res) {  
  googleTrends.hotTrends('US')
    .then(function (response) {
      // console.log(response, 'GOOGLE TRENDS!');
      res.send(response);
    })
    .catch(function(error) {
      console.log(error, 'ERROR! WITH GOOGLE TRENDS');
    });
};

module.exports = {
  hotTrends: hotTrends
};