import db from "../Database.js";
import cloudinary from "../cloudinary.js";

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

    const result = await cloudinary.uploader.upload(req.file.path);
    db.query(
      "INSERT INTO Article (name, description, nbEpisodes, nbSaison, episode, avis, image, cloudinary_id, urlVideo, playlist, ressenti) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        description,
        nbEpisodes,
        nbSaison,
        episode,
        avis,
        result.secure_url,
        result.public_id,
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
          res.send(results);
        }
      }
    );
  }

  static async lesArticleByPlaylist(req, res) {
    const playlist = req.params.playlist;
    db.query(
      "SELECT * from Article where playlist = ?",
      [playlist],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
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
    const image = req.body.image;
    const urlVideo = req.body.video;
    const playlist = req.body.playlist;
    const ressenti = req.body.ressenti;

    db.query(
      "SELECT * from Article where idArticle = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          cloudinary.v2.uploader.destroy(results[0].cloudinary_id);
        }
      }
    );

    const result = await cloudinary.uploader.upload(req.file.path);

    db.query(
      "UPDATE Article SET name = ?, description = ?, nbEpisodes = ?, nbSaison = ?, episode = ?, avis = ?, image = ?, cloudinary_id = ?, urlVideo = ?, playlist = ?, ressenti = ? where idArticle = ?",
      [
        name,
        description,
        nbEpisodes,
        nbSaison,
        episode,
        avis,
        result.secure_url,
        result.public_id,
        urlVideo,
        playlist,
        ressenti,
        id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send("L'update à été effectué");
        }
      }
    );
  }

  static async updateArticleSansImage(req, res) {
    const id = req.params.id;

    const name = req.body.name;
    const description = req.body.description;
    const nbEpisodes = req.body.nbEpisodes;
    const nbSaison = req.body.nbSaison;
    const episode = req.body.episode;
    const avis = req.body.avis;
    const urlVideo = req.body.video;
    const playlist = req.body.playlist;
    const ressenti = req.body.ressenti;

    db.query(
      "UPDATE Article SET name = ?, description = ?, nbEpisodes = ?, nbSaison = ?, episode = ?, avis = ?, urlVideo = ?, playlist = ?, ressenti = ? where idArticle = ?",
      [
        name,
        description,
        nbEpisodes,
        nbSaison,
        episode,
        avis,
        urlVideo,
        playlist,
        ressenti,
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
      "SELECT * from Article where idArticle = ? ;",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          cloudinary.v2.uploader.destroy(
            results[0].cloudinary_id,
            function (result) {
              res.send(result);
            }
          );
        }
      }
    );

    db.query(
      "DELETE from Article where idArticle = ? ;",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Supprimé");
        }
      }
    );
  }
}
