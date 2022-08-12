import db from "../Database.js";

export default class ArticleController {
  static async creerArticle(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const nbEpisodes = req.body.nbEpisodes;
    const nbSaison = req.body.nbSaison;
    const episode = req.body.episode;
    const avis = req.body.avis;
    const image = req.body.image;
    const urlVideo = req.body.video;
    const playlist = req.body.playlist;
    const ressenti = req.body.ressenti;

    db.query(
      "INSERT INTO Article (name, description, nbEpisodes, nbSaison, episode, avis, image, urlVideo, playlist, ressenti) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        description,
        nbEpisodes,
        nbSaison,
        episode,
        avis,
        image,
        urlVideo,
        playlist,
        ressenti,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send("C'est en base");
        }
      }
    );
  }

  static async lesArticles(req, res) {
    db.query("SELECT * from Article;", (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    });
  }

  static async lArticle(req, res) {
    const id = req.params.id;
    db.query(
      "SELECT * from Article where idArticle = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      }
    );
  }

  static async updateArticle(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const nbEpisodes = req.body.nbEpisodes;
    const nbSaison = req.body.nbSaison;
    const episode = req.body.episode;
    const avis = req.body.avis;
    const image = req.body[image];
    const urlVideo = req.body.video;
    const playlist = req.body.playlist;

    db.query(
      "UPDATE Article SET name = ?, description = ?, nbEpisodes = ?, nbSaison = ?, episode = ?, avis = ?, image = ?, urlVideo = ?, playlist = ? where idArticle = ?",
      [
        name,
        description,
        nbEpisodes,
        nbSaison,
        episode,
        avis,
        image,
        urlVideo,
        playlist,
        id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      }
    );
  }

  static async deleteArticle(req, res) {
    const id = req.params.id;
    db.query(
      "DELETE from Article where idArticle = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      }
    );
  }
}
