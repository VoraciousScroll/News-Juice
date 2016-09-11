var User = require('../db/user.schema.js');

module.exports = {
  saveArticle: {
    post: User.saveArticle
  }
};