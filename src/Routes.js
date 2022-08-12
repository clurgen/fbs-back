import express from "express";
import UserController from "./controllers/UserController.js";
import ArticleController from "./controllers/ArticleController.js";
import Jwt from "./jwt";
import Multer from "./Multer";
import Auth from "./Auth";

var router = express.Router();

router.get("/", (req, res) => {
  res.send("yo !");
});
router.get("/articles", ArticleController.lesArticles);
router.get("/article/:id", ArticleController.lArticle);
router.post(
  "/createArticle",
  Multer.upload("articles", "image"),
  ArticleController.creerArticle
);
router.put("/article/edit/:id", ArticleController.updateArticle);
router.delete(
  "/article/delete/:id",
  Auth.isAllowed([1]),
  ArticleController.deleteArticle
);

router.post(
  "/inscription",
  UserController.inscription,
  Multer.upload("inscription", "photo")
);
router.post("/connexion", UserController.connexion);
router.get("/profile", Jwt.validateToken, (req, res) => {
  res.json("profile");
});

export default router;
