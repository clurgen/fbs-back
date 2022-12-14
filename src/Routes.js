import express from "express";
import UserController from "./controllers/UserController.js";
import ArticleController from "./controllers/ArticleController.js";
import FatmanController from "./controllers/FatmanController.js";
import Jwt from "./jwt.js";
import Multer from "./Multer.js";
import Auth from "./Auth.js";
import { errorHandler } from "supertokens-node/framework/express";

const app = express();

var router = express.Router();

router.get("/", (req, res) => {
  res.send("yo !");
});
router.get("/article/:id", ArticleController.lArticle);
router.get("/articles/:playlist", ArticleController.lesArticleByPlaylist);
router.get("/articles", ArticleController.lesArticles);
router.post(
  "/createArticle",
  Multer.upload("image"),
  ArticleController.creerArticle
);
router.put(
  "/article/edit/:id",
  Multer.upload("image"),
  ArticleController.updateArticle
);
router.put(
  "/article/nopicture/edit/:id",
  ArticleController.updateArticleSansImage
);

router.delete("/article/delete/:id", ArticleController.deleteArticle);

router.get("/fatman/:id", FatmanController.leFatman);
router.get("/fatmen", FatmanController.lesFatmen);
router.post(
  "/createFatman",
  Multer.upload("image"),
  FatmanController.creerFatman
);
router.put(
  "/article/edit/:id",
  Multer.upload("image"),
  FatmanController.updateFatman
);
router.put(
  "/fatman/nopicture/edit/:id",
  FatmanController.updateFatmanSansImage
);

router.delete("/fatman/delete/:id", FatmanController.deleteFatman);
// router.post("/inscription", UserController.inscription);
// router.post("/connexion", UserController.connexion);
// router.get("/profile", Jwt.validateToken, (req, res) => {
//   res.json("profile");
// });
app.use(errorHandler());
export default router;
