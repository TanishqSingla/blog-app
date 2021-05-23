const articlecontroller = require("../controllers/article.ctrl");
const multipart = require("connect-multiparty");
const multipartWare = multipart();

module.exports = (router) => {
  // Get all articles
  router.route("/articles").get(articlecontroller.getAll);

  // Add an article
  router.route("/article").post(multipart, articlecontroller.addArticle);

  // Clap on article
  router.route.post(articlecontroller.clapArticle);

  // Comment on article
  router.route("/article/comment").post(articlecontroller.commentArticle);

  // Get a particular article to view
  router.route("/article/:id").get(articlecontroller.getArticle);
};
