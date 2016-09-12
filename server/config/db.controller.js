var User = require('../db/user.schema.js');

module.exports = {
  saveArticle: {
    post: User.saveArticle
  },
  profile: {
    get: User.getArticles
  },
  unsaveArticle: {
    delete: User.unsaveArticle
  }
};