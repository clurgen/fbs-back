import express from "express";
import UserController from "./Controllers/UserController.js";
import ArticleController from "./Controllers/ArticleController.js";

var router = express.Router();

router.get("/articles", ArticleController.lesArticles);
router.get("/article/:id", ArticleController.lArticle);
router.post("/createArticle", ArticleController.creerArticle);
router.put("/article/edit/:id", ArticleController.updateArticle);
router.delete("/article/delete/:id", ArticleController.deleteArticle);

router.post("/inscription", UserController.inscription);
router.post("/connexion", UserController.connexion);

export default router;