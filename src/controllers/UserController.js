import db from "../Database.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";

export default class UserController {
  static async inscription(req, res) {
    const pseudo = req.body.pseudo;
    const mail = req.body.mail;
    const password = req.body.password;
    const type = req.body.type;
    const photo = req.body.photo;

    bcrypt
      .hash(password, 10)
      .then((hash) => {
        db.query(
          "INSERT INTO Users (pseudo, mail, password, type, photo) VALUES (?,?,?,?,?)",
          [pseudo, mail, hash, type, photo]
        );
      })
      .then(() => {
        res.json("Bienvenue !");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  }

  static async connexion(req, res) {
    const pseudo = req.body.pseudo;
    const mail = req.body.mail;
    const password = req.body.password;
    const type = req.body.type;
    const photo = req.body.photo;

    const user = db.query("SELECT * FROM users where mail = ?", [mail]);
    if (!user) res.status(400).json("Cet utilisateur n'existe pas");

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.status(400).json({ error: "Mot de passe érroné" });
      } else {
        res.json("Connecté !");
      }
    });
  }
}
