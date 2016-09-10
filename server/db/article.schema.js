var mongoose = require('mongoose');
var db = require('./config.js');
var User = require('./user.schema.js');

var articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishDate: Date,
  articleLink: String,
  articleSource: String,
  img: String,
  body: String
});

var Article = mongoose.model('Article', articleSchema);

Article.saveArticle = function(req, res, callback) {
  var user = req.headers['x-xsrf-token'];
  console.log('this');
};


module.exports = Article;



      // topic: topic.title[0],
      // articleTitle: topic['ht:news_item'][0]['ht:news_item_title'][0],
      // traffic: topic['ht:approx_traffic'][0],
      // img: 'http://' + topic['ht:picture'][0].slice(2),
      // articleLink: topic['ht:news_item'][0]['ht:news_item_url'][0], 
      // articleSource: topic['ht:news_item'][0]['ht:news_item_source'][0]