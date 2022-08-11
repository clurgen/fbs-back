import express from "express";
import UserController from "./Controllers/UserController.js";
import ArticleController from "./Controllers/ArticleController.js";
import Jwt from "./jwt.js";
import Multer from "./Multer.js";
import Auth from "./Auth.js";

var router = express.Router();

router.get("/articles", ArticleController.lesArticles);
router.get("/article/:id", ArticleController.lArticle);
router.post(
  "/createArticle",
  Auth.isAllowed([1]),
  Multer.upload("articles", "image"),
  ArticleController.creerArticle
);
router.put(
  "/article/edit/:id",
  Auth.isAllowed([1]),
  ArticleController.updateArticle
);
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
